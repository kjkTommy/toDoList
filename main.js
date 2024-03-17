const form = document.querySelectorAll(".todo-form");

const priority = {
  high: "high",
  low: "low",
};

const progress = {
  inProgress: "inProgress",
  done: "done",
};
import data from "./task.json" assert { type: "json" };
let toDoList = data;
const isValidName = (name) => {
  if (name.length > 30 || name.length < 3) {
    throw new Error("Некорректная длина строки");
  }
  if (!name) {
    alert("Строка пустая");
  }
};
function addTaskInForm(event) {
  event.preventDefault();
  const forms = this;
  const input = forms.querySelector(".input-task");
  const priority = forms.id;
  const name = input.value.trim();
  try {
    isValidName(name);
    addTask(name, priority);
  } catch (error) {
    alert(`Неправильный ввод ${error.message}`);
  }
  forms.reset();
  renderList(priority);
}

const changeTaskStatus = (index, priority) => {
  const currentTask = toDoList[priority][index].status;
  const newStatus =
    currentTask === progress.done ? progress.inProgress : progress.done;
  toDoList[priority][index].status = newStatus;
};

const addTask = (name, priority, status = progress.inProgress) => {
  const newTask = {
    name,
    status,
  };

  toDoList[priority].push(newTask);
};

const deleteTask = (index, priority) => toDoList[priority].splice(index, 1);

function renderList(priority) {
  const list = document.querySelector(`.task-list#${priority}`);
  list.innerHTML = "";
  toDoList[priority].forEach((task, index) => {
    const name = task.name;
    const status = task.status;
    const isDone = status === progress.done;
    const toDoElement = document.createElement("li");
    toDoElement.className = "todo-item";
    toDoElement.innerHTML = `<input type="checkbox" class="checkbox-round" ${
      isDone ? "checked" : ""
    }/><label class="task-name"></label></button><button class="task-remove"><span class="lnr lnr-cross"></span></button>`;
    if (isDone) {
      toDoElement.classList.add("checked");
    }
    toDoElement.querySelector(".task-name").textContent = name;
    const btnCheck = toDoElement.querySelector(".checkbox-round");
    btnCheck.addEventListener("click", () => {
      changeTaskStatus(index, priority);
      renderList(priority);
    });
    const removeBtn = toDoElement.querySelector(".task-remove");
    removeBtn.addEventListener("click", () => {
      deleteTask(index, priority);
      renderList(priority);
    });
    list.appendChild(toDoElement);
  });
}

Object.values(priority).forEach((priority) => {
  renderList(priority);
});

form.forEach((form) => {
  form.addEventListener("submit", addTaskInForm);
});
