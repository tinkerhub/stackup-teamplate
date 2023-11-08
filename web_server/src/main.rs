mod extensions;
mod structs;

use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use extensions::PairExt;
use sqlite::ConnectionWithFullMutex;
use std::{net::SocketAddr, sync::Arc};
use structs::{Project, SubTask, Task, User};

struct AppState {
    conn: sqlite::ConnectionWithFullMutex,
}

impl AppState {
    #[cfg(debug_assertions)]
    fn new() -> Self {
        Self {
            conn: sqlite::Connection::open_with_full_mutex("../data.db")
                .expect("file should exist"),
        }
    }

    #[cfg(not(debug_assertions))]
    //TODO: make it create db with tables if they don't exist already
    fn new() -> Self {
        Self {
            conn: {
                let cmd = r#"
                CREATE TABLE IF NOT EXISTS "projects" (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "name"	TEXT NOT NULL,
                    "user_id"	INTEGER NOT NULL,
                    FOREIGN KEY("user_id") REFERENCES "users"("id"),
                    PRIMARY KEY("id" AUTOINCREMENT)
                );
                CREATE TABLE IF NOT EXISTS "users" (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "name"	TEXT NOT NULL,
                    "about"	TEXT NOT NULL,
                    "github_link"	TEXT NOT NULL,
                    "email"	TEXT NOT NULL UNIQUE,
                    PRIMARY KEY("id" AUTOINCREMENT)
                );
                CREATE TABLE IF NOT EXISTS "tasks" (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "title"	TEXT NOT NULL,
                    "deadline"	TEXT,
                    "priority"	TEXT CHECK("priority" IN ("HIGH", "LOW", "MEDIUM")),
                    "progress"	TEXT CHECK("progress" IN ("NOT_STARTED", "IN_PROGRESS", "COMPLETED")),
                    "project_id"	TEXT NOT NULL,
                    FOREIGN KEY("project_id") REFERENCES "projects"("id"),
                    PRIMARY KEY("id" AUTOINCREMENT)
                );
                CREATE TABLE IF NOT EXISTS "subtasks" (
                    "id"	INTEGER NOT NULL UNIQUE,
                    "text"	TEXT NOT NULL,
                    "is_completed"	INTEGER NOT NULL DEFAULT 0 CHECK("is_completed" IN (0, 1)),
                    "task_id"	INTEGER NOT NULL,
                    FOREIGN KEY("task_id") REFERENCES "tasks"("id"),
                    PRIMARY KEY("id" AUTOINCREMENT)
                );
                "#;
            let conn = sqlite::Connection::open_with_full_mutex("../data.db").expect("should open");
            conn.execute(cmd).expect("should work"); conn},
        }
    }
}

#[tokio::main]
async fn main() {
    let shared_state = Arc::new(AppState::new());
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        .route("/", get(root))
        .route("/users", post(create_user))
        .with_state(shared_state.clone())
        .route("/users", get(get_all_users))
        .with_state(shared_state.clone())
        .route("/users/:user_id", get(get_user))
        .with_state(shared_state.clone())
        .route("/users/:user_id/projects", post(create_project))
        .with_state(shared_state.clone())
        .route("/projects/:project_id/tasks", post(create_task))
        .with_state(shared_state.clone())
        .route("/tasks/:task_id/subtasks", post(create_subtask))
        .with_state(shared_state.clone());

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    let addr = if cfg!(debug_assertions) {
        SocketAddr::from(([127, 0, 0, 1], 3000)) 
    }
    else {
        SocketAddr::from(([0, 0, 0, 0], 3000))
    };
    // http://127.0.0.1:3000
    println!("listening on {}", addr);
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> &'static str {
    println!("Hello, World!");
    "Hello, World!"
}
fn get_subtasks(
    task_id: u32,
    conn: &ConnectionWithFullMutex,
) -> Result<Vec<SubTask>, sqlite::Error> {
    let query = format!("SELECT * FROM subtasks WHERE task_id={}", task_id);
    let mut subtasks = vec![];
    conn.iterate(query, |pairs| {
        let mut pairs = pairs.into_iter();
        let project = SubTask {
            id: Some(pairs.next_field()),
            text: pairs.next_field(),
            is_completed: {
                // stored in db as 0 and 1, not "true" and "false"
                // so we need to do some type conversion
                match pairs.next_field::<u8>() {
                    0 => false,
                    1 => true,
                    _ => unreachable!(),
                }
            },
        };
        subtasks.push(project);
        true
    })?;
    Ok(subtasks)
}

fn get_tasks(project_id: u32, conn: &ConnectionWithFullMutex) -> Result<Vec<Task>, sqlite::Error> {
    let query = format!("SELECT * FROM tasks WHERE project_id={}", project_id);
    let mut tasks = vec![];
    conn.iterate(query, |pairs| {
        let mut pairs = pairs.into_iter();
        let task_id = pairs.next_field();
        let subtasks = match get_subtasks(task_id, conn) {
            Ok(subtasks) => subtasks,
            Err(e) => {
                println!("{e}");
                // return true is basically continue here
                return true;
            }
        };
        let project = Task {
            id: Some(task_id),
            title: pairs.next_field(),
            deadline: pairs.next_field(),
            priority: pairs.next_field(),
            progress: pairs.next_field(),
            //TODO: Subtasks
            subtasks: subtasks,
        };
        tasks.push(project);
        true
    })?;
    Ok(tasks)
}
fn get_projects(
    user_id: u32,
    conn: &ConnectionWithFullMutex,
) -> Result<Vec<Project>, sqlite::Error> {
    let query = format!("SELECT * FROM projects WHERE user_id={}", user_id);
    let mut projects = vec![];
    conn.iterate(query, |pairs| {
        let mut pairs = pairs.into_iter();

        let project_id = pairs.next_field();
        let tasks = match get_tasks(project_id, conn) {
            Ok(tasks) => tasks,
            Err(e) => {
                println!("{e}");
                // return true is basically continue here
                return true;
            }
        };
        let project = Project {
            id: Some(project_id),
            name: pairs.next_field(),
            tasks: tasks,
        };
        projects.push(project);
        true
    })?; // if conn.iterate failrs, returns Err
    Ok(projects)
}

fn get_users(id: Option<u32>, conn: &ConnectionWithFullMutex) -> Result<Vec<User>, sqlite::Error> {
    let query = match id {
        Some(id) => format!("SELECT * FROM users WHERE id={};", id),
        None => "SELECT * FROM users;".to_owned(),
    };
    let mut users = Vec::new();
    conn.iterate(query, |pairs| {
        let mut pairs = pairs.into_iter();
        let user_id = pairs.next_field();
        let projects = match get_projects(user_id, conn) {
            Ok(projects) => projects,
            Err(e) => {
                println!("{e}");
                // return true is basically continue here
                return true;
            }
        };
        let user = User {
            id: Some(user_id),
            name: pairs.next_field(),
            about: pairs.next_field(),
            github: pairs.next_field(),
            email: pairs.next_field(),
            projects: projects,
        };
        users.push(user);
        true
    })?;
    Ok(users)
}

async fn get_all_users(State(state): State<Arc<AppState>>) -> (StatusCode, Json<Vec<User>>) {
    let users = match get_users(None, &state.conn) {
        Ok(users) => users,
        Err(e) => {
            println!("{e}");
            return (StatusCode::INTERNAL_SERVER_ERROR, Json(vec![]));
        }
    };
    (StatusCode::OK, Json(users))
}

async fn get_user(
    Path(id): Path<u32>,
    State(state): State<Arc<AppState>>,
) -> Result<(StatusCode, Json<User>), StatusCode> {
    let Ok(mut users) = get_users(Some(id), &state.conn) else {
        todo!()
    };
    if users.len() < 1 {
        return Err(StatusCode::NO_CONTENT);
    } else if users.len() > 1 {
        return Err(StatusCode::INTERNAL_SERVER_ERROR);
    }
    let user = users.remove(0);
    Ok((StatusCode::OK, Json(user)))
}

async fn create_user(State(state): State<Arc<AppState>>, Json(payload): Json<User>) -> StatusCode {
    // TODO:
    //  Verify Email
    //  Verify Github
    //  get pfp from github?

    let User {
        name,
        about,
        github,
        email,
        ..
    } = payload;

    let cmd = format!(
        r#"INSERT INTO users(name, about, github_link, email) VALUES ("{name}", "{about}", "{github}", "{email}")"#
    );
    match state.conn.execute(cmd) {
        Ok(_) => StatusCode::CREATED,
        // TODO: replace with better status code
        Err(err) => {
            println!("{}", err);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}

async fn create_project(
    Path(user_id): Path<u64>,
    State(state): State<Arc<AppState>>,
    Json(payload): Json<Project>,
) -> StatusCode {
    let Project { name, .. } = payload;

    let cmd = format!(r#"INSERT INTO projects(name, user_id) VALUES ("{name}", {user_id})"#);
    match state.conn.execute(cmd) {
        Ok(_) => StatusCode::CREATED,
        // TODO: replace with better status code
        Err(err) => {
            println!("{}", err);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}

async fn create_task(
    Path(project_id): Path<u32>,
    State(state): State<Arc<AppState>>,
    Json(payload): Json<Task>,
) -> StatusCode {
    //TODO: verifuy deadline format
    let Task {
        title,
        deadline,
        priority,
        progress,
        ..
    } = payload;

    let cmd = format!(
        r#"INSERT INTO tasks(title, deadline, priority, progress, project_id) VALUES ("{title}","{deadline}", "{priority}", "{progress}", {project_id})"#
    );
    match state.conn.execute(cmd) {
        Ok(_) => StatusCode::CREATED,
        // TODO: replace with better status code
        Err(err) => {
            println!("{}", err);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}
async fn create_subtask(
    Path(task_id): Path<u32>,
    State(state): State<Arc<AppState>>,
    Json(payload): Json<SubTask>,
) -> StatusCode {
    //TODO: verifuy deadline format
    let SubTask {
        text, is_completed, ..
    } = payload;

    let cmd = format!(
        r#"INSERT INTO subtasks(text, is_completed, task_id) VALUES ("{text}", {is_completed}, {task_id})"#
    );
    match state.conn.execute(cmd) {
        Ok(_) => StatusCode::CREATED,
        // TODO: replace with better status code
        Err(err) => {
            println!("{}", err);
            StatusCode::INTERNAL_SERVER_ERROR
        }
    }
}
