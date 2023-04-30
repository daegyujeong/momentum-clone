const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const notToDoList = document.getElementById("not-todo-list");
const comleteList = document.getElementById("complete-list");
const pendingList = document.getElementById("pending-list");
const toDoRadioGroup = document.querySelector(".todo-radiogroup__todo");
const notToDoRadioGroup = document.querySelector(".todo-radiogroup__not-todo");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}
function returnToDo(event) {
  const li = event.target.parentElement;
  const returnButton = li.querySelector(".todo-return-button");
  const completeButton = document.createElement("button");
  if(li.parentElement === comleteList)
  {
    completeButton.classList.add("todo-complete-button");
    completeButton.innerText = "⭕️";
    completeButton.addEventListener("click", comleteToDo);
    li.appendChild(completeButton);
  }  

  const pendingButton = document.createElement("button");
  pendingButton.classList.add("todo-pending-button");
  pendingButton.innerText = "❗️";
  pendingButton.addEventListener("click", deleteToDo);
  li.appendChild(pendingButton);  
  returnButton.remove();
  if(li.classList.contains("todo"))
  {
    li.classList.remove("todo");
    toDoList.appendChild(li);
  }
    else
  {
    li.classList.remove("not-todo");
    notToDoList.appendChild(li);
  }   
  saveToDos();

  // toDoList.appendChild(li); 
  // const returnButton = document.createElement("button");
  // const completeButton = li.querySelector(".todo-complete-button");
  // const pendingButton = li.querySelector(".todo-pending-button");
  // returnButton.classList.add("todo-return-button");
  // returnButton.innerText = "🔺";
  // returnButton.addEventListener("click", returnToDo);
  // li.appendChild(returnButton);
  // li.classList.add("completetodo");
  // completeButton.remove();
  // pendingButton.remove();
}

function comleteToDo(event) {
  const li = event.target.parentElement;
  if(li.parentElement === toDoList)
  {
  li.classList.add("todo");
  }
  else if((li.parentElement === notToDoList))
  {
    li.classList.add("not-todo");
  }
  comleteList.appendChild(li); 
  const returnButton = document.createElement("button");
  const completeButton = li.querySelector(".todo-complete-button");
  const pendingButton = li.querySelector(".todo-pending-button");
  returnButton.classList.add("todo-return-button");
  returnButton.innerText = "🔺";
  returnButton.addEventListener("click", returnToDo);
  li.appendChild(returnButton);
  completeButton.remove();
  pendingButton.remove();
  saveToDos();
}
function pendingTodo(event) {
  const li = event.target.parentElement;
  if(li.parentElement === toDoList)
  {
  li.classList.add("todo");
  }
  else
  {
    li.classList.add("not-todo");
  }
  pendingList.appendChild(li); 
  const returnButton = document.createElement("button");
  // const completeButton = li.querySelector(".todo-complete-button");
  const pendingButton = li.querySelector(".todo-pending-button");
  returnButton.classList.add("todo-return-button");
  returnButton.innerText = "🔺";
  returnButton.addEventListener("click", returnToDo);
  li.appendChild(returnButton);
  // completeButton.remove();
  pendingButton.remove();
  saveToDos();
}


function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.classList.add("todo-delete-button");
  deleteButton.addEventListener("click", deleteToDo);
  const completeButton = document.createElement("button");
  completeButton.classList.add("todo-complete-button");
  completeButton.innerText = "⭕️";
  completeButton.addEventListener("click", comleteToDo);
  const pendingButton = document.createElement("button");
  pendingButton.classList.add("todo-pending-button");
  pendingButton.innerText = "❗️";
  pendingButton.addEventListener("click", pendingTodo);
  li.appendChild(span);
  li.appendChild(deleteButton);
  li.appendChild(completeButton);
  li.appendChild(pendingButton);
  if(toDoRadioGroup.children[0].checked)
  {
  toDoList.appendChild(li);
  }
  else
  {
    notToDoList.appendChild(li);
  }

}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}
function handleToDoRadioClick(event) {
  event.preventDefault();
  if(event.target === toDoRadioGroup || event.target === toDoRadioGroup.children[1])
  {
    console.dir(toDoRadioGroup.children[0].checked);
    toDoRadioGroup.children[0].checked = true;
    toDoRadioGroup.classList.remove("unselect")
    toDoRadioGroup.classList.add("select")
    notToDoRadioGroup.classList.remove("select")
    notToDoRadioGroup.classList.add("unselect")
  }
  else if(event.target === notToDoRadioGroup || event.target === notToDoRadioGroup.children[1])
  {
    console.dir(notToDoRadioGroup.children[0].checked);
    notToDoRadioGroup.children[0].checked = true;
    notToDoRadioGroup.classList.remove("unselect")
    notToDoRadioGroup.classList.add("select")
    toDoRadioGroup.classList.remove("select")
    toDoRadioGroup.classList.add("unselect")
    // toDoRadioGroup.classList.add("nottodo");
  }
}

toDoForm.addEventListener("submit", handleToDoSubmit);
toDoRadioGroup.addEventListener("click", handleToDoRadioClick);
notToDoRadioGroup.addEventListener("click", handleToDoRadioClick);

function init() {
  const savedToDos = localStorage.getItem(TODOS_KEY);
  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
}
init();
