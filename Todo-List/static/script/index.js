var todoList = document.getElementsByClassName("task")[0];
var todoInput = document.getElementById("todo");
var addButton = document.getElementById("add-todo");
var statusButton = document.getElementsByClassName("status-btn-list")[0];
var pageStatus = "all";

function initDataBase() {
  var data = localStorage.getItem("todoList");
  if (!data) {
    var dataArr = [];
    localStorage.setItem("todoList", JSON.stringify(dataArr));
  }
}

initDataBase();

function TodoList() {
  todoList.innerHTML = "";
  initList();
}

function addTodo() {
  let dataArr = JSON.parse(localStorage.getItem("todoList"));
  let index = dataArr.length;
  if (todoInput.value === "") {
    return;
  }
  if (todoInput.value) {
    const value = {
      id: index,
      content: todoInput.value,
      isFin: false
    };
    dataArr.push(value);
    localStorage.setItem("todoList", JSON.stringify(dataArr));
  }
}

function initList() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for (let index = 0; index < item.length; ++index) {
    var todoItem = document.createElement("li");
    if (item[index].isFin) {
      todoItem.className = "done-item";
    }
    todoItem.innerHTML = `
    <input type="checkbox" name="check-item" ${
      item[index].isFin ? "checked" : ""
    } onclick = changeState(${item[index].id}) /><span>${
      item[index].content
    }</span>
  `;
    todoList.appendChild(todoItem);
  }
}

function showContent(status) {
  todoList.innerHTML = "";
  if (status === "active") {
    showActive();
  } else if (status === "complete") {
    showComplete();
  } else {
    initList();
  }
}

function showActive() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for (let index = 0; index < item.length; ++index) {
    if (!item[index].isFin) {
      var todoItem = document.createElement("li");
      todoItem.innerHTML = `
      <input type="checkbox" name="check-item" onclick = changeState(${item[index].id}) /><span>${item[index].content}</span>
    `;
      todoList.appendChild(todoItem);
    }
  }
}

function showComplete() {
  let item = JSON.parse(localStorage.getItem("todoList"));
  todoList.innerHTML = "";
  for (let index = 0; index < item.length; ++index) {
    if (item[index].isFin) {
      var todoItem = document.createElement("li");
      todoItem.className = "done-item";
      todoItem.innerHTML = `
      <input type="checkbox" name="check-item" ${
        item[index].isFin ? "checked" : ""
      } onclick = changeState(${item[index].id}) /><span>${
        item[index].content
      }</span>
    `;
      todoList.appendChild(todoItem);
    }
  }
}

function addItemAndShow() {
  addTodo();
  switch (pageStatus) {
    case "all":
      initList();
      break;
    case "active":
      showActive();
      break;
    case "complete":
      showComplete();
      break;
  }
}

function changeState(index) {
  let dataArr = JSON.parse(localStorage.getItem("todoList"));
  let item = 0;
  while (index !== dataArr[item].id) {
    item++;
  }
  dataArr[item].isFin = !dataArr[item].isFin;
  localStorage.setItem("todoList", JSON.stringify(dataArr));
  switch (pageStatus) {
    case "all":
      initList();
      break;
    case "active":
      showActive();
      break;
    case "complete":
      showComplete();
  }
}

statusButton.addEventListener("click", function(event) {
  let target = event.target;
  let item = JSON.parse(localStorage.getItem("todoList"));
  switch (target.name) {
    case "check-item":
      changeState(target);
      break;
    case "all-btn":
      pageStatus = "all";
      initList();
      break;
    case "active-btn":
      pageStatus = "active";
      showContent("active");
      break;
    case "complete-btn":
      pageStatus = "complete";
      showContent("complete");
      break;
    default:
      break;
  }
});

TodoList();
