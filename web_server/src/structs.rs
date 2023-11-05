use std::str::FromStr;

use serde::{Deserialize, Serialize};

// the output to our `create_user` handler
#[derive(Serialize, Deserialize, Debug)]
pub struct User {
    pub id: Option<u32>,
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

impl std::fmt::Display for Priority {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Priority::Low => write!(f, "LOW"),
            Priority::Med => write!(f, "MEDIUM"),
            Priority::High => write!(f, "HIGH"),
        }
    }
}

impl std::fmt::Display for Progress {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Progress::NotStarted => write!(f, "NOT_STARTED"),
            Progress::InProgress => write!(f, "IN_PROGRESS"),
            Progress::Completed => write!(f, "COMPLETED"),
        }
    }
}

impl FromStr for Priority {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let priority = match s {
            "LOW" => Priority::Low,
            "MEDIUM" => Priority::Med,
            "HIGH" => Priority::High,
            _ => Err(())?,
        };
        Ok(priority)
    }
}

impl FromStr for Progress {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let progress = match s {
            "NOT_STARTED" => Progress::NotStarted,
            "IN_PROGRESS" => Progress::InProgress,
            "COMPLETED" => Progress::Completed,
            _ => Err(())?,
        };
        Ok(progress)
    }
}
