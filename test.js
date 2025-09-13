// todo.js

const fs = require("fs");
const readline = require("readline");

const FILE = "tasks.json"; // where tasks will be stored
let tasks = [];

// Load tasks from file if it exists
if (fs.existsSync(FILE)) {
  const data = fs.readFileSync(FILE, "utf-8");
  try {
    tasks = JSON.parse(data);
  } catch {
    tasks = [];
  }
}

// Setup terminal input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function saveTasks() {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

function showMenu() {
  console.log("\n=== TO-DO LIST ===");
  console.log("1. View tasks");
  console.log("2. Add task");
  console.log("3. Mark task as done");
  console.log("4. Delete task");
  console.log("5. Exit");

  rl.question("Choose an option: ", handleMenu);
}

function handleMenu(option) {
  switch (option.trim()) {
    case "1":
      viewTasks();
      break;
    case "2":
      addTask();
      break;
    case "3":
      markTaskDone();
      break;
    case "4":
      deleteTask();
      break;
    case "5":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Invalid option!");
      showMenu();
  }
}

function viewTasks() {
  if (tasks.length === 0) {
    console.log("No tasks yet!");
  } else {
    tasks.forEach((task, i) => {
      console.log(`${i + 1}. ${task.done ? "[✔]" : "[ ]"} ${task.text}`);
    });
  }
  showMenu();
}

function addTask() {
  rl.question("Enter a task: ", (taskText) => {
    tasks.push({ text: taskText, done: false });
    saveTasks();
    console.log("Task added!");
    showMenu();
  });
}

function markTaskDone() {
  viewTasks();
  rl.question("Enter task number to mark as done: ", (num) => {
    let index = parseInt(num) - 1;
    if (tasks[index]) {
      tasks[index].done = true;
      saveTasks();
      console.log("Task marked as done!");
    } else {
      console.log("Invalid task number!");
    }
    showMenu();
  });
}

function deleteTask() {
  viewTasks();
  rl.question("Enter task number to delete: ", (num) => {
    let index = parseInt(num) - 1;
    if (tasks[index]) {
      tasks.splice(index, 1);
      saveTasks();
      console.log("Task deleted!");
    } else {
      console.log("Invalid task number!");
    }
    showMenu();
  });
}

// Start program
showMenu();