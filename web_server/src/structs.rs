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
    #[serde(default)]
    pub projects: Vec<Project>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    pub id: Option<u32>,
    pub name: String,
    #[serde(default)]
    pub tasks: Vec<Task>,
}

#[derive(Serialize, Deserialize, Debug, Default)]
pub enum Priority {
    #[serde(alias = "LOW")]
    #[default]
    Low,
    #[serde(alias = "MEDIUM")]
    Med,
    #[serde(alias = "HIGH")]
    High,
}
#[derive(Serialize, Deserialize, Debug, Default)]
pub enum Progress {
    #[serde(alias = "NOT_STARTED")]
    #[default]
    NotStarted,
    #[serde(alias = "IN_PROGRESS")]
    InProgress,
    #[serde(alias = "COMPLETED")]
    Completed,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct Task {
    pub id: Option<u32>,
    pub title: String,
    pub deadline: String,
    pub priority: Priority,
    #[serde(default)]
    pub progress: Progress,
    #[serde(default)]
    pub subtasks: Vec<SubTask>,
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
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let priority = match s {
            "LOW" => Priority::Low,
            "MEDIUM" => Priority::Med,
            "HIGH" => Priority::High,
            _ => Err(format!("Priority cannot be parsed from {s}"))?,
        };
        Ok(priority)
    }
}

impl FromStr for Progress {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let progress = match s {
            "NOT_STARTED" => Progress::NotStarted,
            "IN_PROGRESS" => Progress::InProgress,
            "COMPLETED" => Progress::Completed,
            _ => Err(format!("Progress cannot be parsed from {s}"))?,
        };
        Ok(progress)
    }
}
