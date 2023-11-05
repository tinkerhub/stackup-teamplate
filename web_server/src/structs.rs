use serde::{Deserialize, Serialize};

// the output to our `create_user` handler
#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: Option<u128>,
    pub name: String,
    pub about: String,
    pub github: String,
    pub email: String,
    pub projects: Option<Vec<Project>>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    pub id: Option<u32>,
    pub name: String,
    pub tasks: Option<Vec<Task>>,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum Priority {
    Low,
    Med,
    High,
}
#[derive(Serialize, Deserialize, Debug)]
pub enum Progress {
    NotStarted,
    InProgress,
    Completed,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Task {
    pub id: Option<u32>,
    pub title: String,
    pub deadline: String,
    pub priority: Priority,
    pub progress: Progress,
    pub subtasks: Option<Vec<SubTask>>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct SubTask {
    pub id: Option<u32>,
    pub text: String,
    pub is_completed: bool,
}
