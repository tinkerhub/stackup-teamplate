mod structs;
use axum::{
    extract::State,
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::{net::SocketAddr, sync::Arc};
use structs::User;

struct AppState {
    conn: sqlite::ConnectionWithFullMutex,
}

#[tokio::main]
async fn main() {
    let shared_state = Arc::new(AppState {
        conn: sqlite::Connection::open_with_full_mutex("../../data.db").expect("file should exist"),
    });
    tracing_subscriber::fmt::init();

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        // `POST /users` goes to `create_user`
        .route("/users", post(create_user))
        .with_state(shared_state);

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
// basic handler that responds with a static string
async fn root() -> &'static str {
    "Hello, World!"
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    State(state): State<Arc<AppState>>,
    Json(payload): Json<User>,
) -> StatusCode {
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

    let cmd = format!(r#"INSERT INTO users VALUES ("{name}", "{about}", "{github}", "{email}"))"#);
    match state.conn.execute(cmd) {
        Ok(_) => StatusCode::CREATED,
        // TODO: replace with better status code
        Err(_) => StatusCode::IM_A_TEAPOT,
    }
}
