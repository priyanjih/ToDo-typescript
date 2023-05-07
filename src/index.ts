import { v4 as uuidv4 } from "uuid";

console.log("hello");

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTask();
tasks.forEach((task) => addListitem(task));
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input?.value == "" || input?.value == null) return;

  const newtask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newtask);

  addListitem(newtask);
  input.value = "";
});

function addListitem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask(): Task[] {
  const taskJson = localStorage.getItem("tasks");
  if (taskJson == null) return [];
  return JSON.parse(taskJson);
}
