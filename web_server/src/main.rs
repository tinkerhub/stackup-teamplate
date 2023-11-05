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
use structs::User;

struct AppState {
    conn: sqlite::ConnectionWithFullMutex,
}

#[tokio::main]
async fn main() {
    let shared_state = Arc::new(AppState {
        conn: sqlite::Connection::open_with_full_mutex("../data.db").expect("file should exist"),
    });
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        .route("/users", post(create_user))
        .with_state(shared_state.clone())
        .route("/users", get(get_all_users))
        .with_state(shared_state.clone())
        .route("/users/:user_id", get(get_user))
        .with_state(shared_state.clone());

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    // http://127.0.0.1:3000
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

fn get_users(id: Option<u128>, conn: &ConnectionWithFullMutex) -> Result<Vec<User>, sqlite::Error> {
    let query = match id {
        Some(id) => format!("SELECT * FROM users WHERE id={};", id),
        None => "SELECT * FROM users;".to_owned(),
    };
    let mut users = Vec::new();
    conn.iterate(query, |pairs| {
        let mut pairs = pairs.into_iter();

        let user = User {
            id: Some(pairs.next_field()),
            name: pairs.next_field(),
            about: pairs.next_field(),
            github: pairs.next_field(),
            email: pairs.next_field(),
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
    Path(id): Path<u128>,
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
