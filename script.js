// Select elements
const inputBox = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const toggleBtn = document.getElementById("toggleMode");

// Add task on button click
addBtn.addEventListener("click", function () {
  const taskText = inputBox.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  inputBox.value = "";
  saveTasks();
});

// Create a task list item
function createTaskElement(text, done) {
  const li = document.createElement("li");
  li.textContent = text;

  if (done) {
    li.classList.add("done");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("done");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");

  delBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTaskElement(task.text, task.done);
  });
}

loadTasks();

// Light/Dark mode toggle
if (localStorage.getItem("mode") === "dark") {
  document.body.classList.add("dark-mode");
}

toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("mode", mode);
});
