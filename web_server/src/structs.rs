struct User {
    id: u128,
    name: String,
    about: String,
    github: String,
    email: String,
    projects: Vec<Project>,
}

struct Project {
    id: u32,
    name: String,
    tasks: Vec<Task>,
}

enum Priority {
    Low,
    Med,
    High,
}
enum Progress {
    NotStarted,
    InProgress,
    Completed,
}
struct Task {
    id: u32,
    title: String,
    deadline: chrono::prelude::NaiveDate,
    Priority: Priority,
    progress: Progress,
    subtasks: Vec<SubTask>,
}

struct SubTask {
    id: u32,
    text: String,
    is_completed: bool,
}
