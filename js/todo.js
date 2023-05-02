const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");
const notToDoList = document.getElementById("not-todo-list");
const completeList = document.getElementById("complete-list");
const pendingList = document.getElementById("pending-list");
const toDoRadioGroup = document.querySelector(".todo-radiogroup__todo");
const notToDoRadioGroup = document.querySelector(".todo-radiogroup__not-todo");

const TODOS_KEY = "todos";
const NOT_TODOS_KEY = "notTodos";
const PENDING_KEY = "pending";
const COMPLETE_KEY = "complete";

let toDos = [];
let notToDos = [];
let pendingToDos = [];
let completeToDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  localStorage.setItem(NOT_TODOS_KEY, JSON.stringify(notToDos));
  localStorage.setItem(PENDING_KEY, JSON.stringify(pendingToDos));
  localStorage.setItem(COMPLETE_KEY, JSON.stringify(completeToDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  console.log(toDos);
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  toDos = toDos.filter((toDo) => toDo.id !== undefined);
  notToDos = notToDos.filter((notToDo) => notToDo.id !== parseInt(li.id));
  notToDos = notToDos.filter((notToDo) => notToDo.id !== undefined);
  pendingToDos = pendingToDos.filter((pendingToDo) => pendingToDo.id !== parseInt(li.id));
  pendingToDos = pendingToDos.filter((pendingToDo) => pendingToDo.id !== undefined);
  completeToDos = completeToDos.filter((completeToDo) => completeToDo.id !== parseInt(li.id));
  completeToDos = completeToDos.filter((completeToDo) => completeToDo.id !== undefined);
  saveToDos();
}
function returnToDo(event) {
  const li = event.target.parentElement;
  const returnButton = li.querySelector(".todo-return-button");
  const completeButton = document.createElement("button");
  const pendingButton = document.createElement("button");
  const span = li.querySelector("span");
  if(li.parentElement === completeList)
  {
    completeToDos = completeToDos.filter((completeToDo) => completeToDo.id !== parseInt(li.id));
    completeButton.classList.add("todo-complete-button");
    completeButton.innerText = "⭕️";
    completeButton.addEventListener("click", comleteToDo);
    li.appendChild(completeButton);
  }  
  else
  {
    pendingToDos = pendingToDos.filter((pendingToDo) => pendingToDo.id !== parseInt(li.id));
  }

  pendingButton.classList.add("todo-pending-button");
  pendingButton.innerText = "❗️";
  pendingButton.addEventListener("click", pendingTodo);
  li.appendChild(pendingButton);  
  returnButton.remove();


  if(li.classList.contains("todo"))
  {
    li.classList.remove("todo");
    toDoList.appendChild(li);
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
    };
    toDos.push(newTodoObj);

  }
    else
  {
    li.classList.remove("not-todo");
    notToDoList.appendChild(li);
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
    };
    notToDos.push(newTodoObj);    
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
  const span = li.querySelector("span");
  if(li.parentElement === toDoList)
  {
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
      class: "todo",
    };
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.classList.add(newTodoObj.class);  
    completeToDos.push(newTodoObj);
  }
  else if((li.parentElement === notToDoList))
  {
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
      class: "not-todo",
    };
    notToDos = notToDos.filter((notToDo) => notToDo.id !== parseInt(li.id));
    li.classList.add(newTodoObj.class);
    completeToDos.push(newTodoObj);
  }
  else{
    let classname = "";
    if(li.classList.contains("not-todo")) 
    {
      classname = "not-todo";
    }
    else if(li.classList.contains("todo"))
    {
      classname = "todo";

    }
    else{
      classname = "";
    }
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
      class: classname,
    };    
    pendingToDos = pendingToDos.filter((toDo) => pendingToDos.id !== parseInt(li.id));
    completeToDos.push(newTodoObj);
  }
  const completeButton = li.querySelector(".todo-complete-button");
  const pendingButton = li.querySelector(".todo-pending-button");
  if(li.parentElement !== pendingList)
  {
    console.log(li.parentElement);
    const returnButton = document.createElement("button");
    returnButton.classList.add("todo-return-button");
    returnButton.innerText = "🔺";
    returnButton.addEventListener("click", returnToDo);
    li.appendChild(returnButton);
  }
  completeList.appendChild(li); 

  completeButton.remove();
  pendingButton.remove();
  saveToDos();
}
function pendingTodo(event) {
  const li = event.target.parentElement;
  const span = li.querySelector("span");
  if(li.parentElement === toDoList)
  {
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
      class: "todo",
    };
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.classList.add(newTodoObj.class);  
    pendingToDos.push(newTodoObj);
  }
  else if((li.parentElement === notToDoList))
  {
    const newTodoObj = {
      text: span.innerText,
      id: parseInt(li.id),
      class: "not-todo",
    };
    notToDos = notToDos.filter((notToDo) => notToDo.id !== parseInt(li.id));
    li.classList.add(newTodoObj.class);
    pendingToDos.push(newTodoObj);
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


function paintNewToDo(newTodo) {
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
  console.dir(li);
}
function paintToDo(Todo,TodoType) {
  console.log(Todo.id);
  console.log(completeToDos);
  console.log(TodoType);
  const li = document.createElement("li");
  li.id = Todo.id;
  const span = document.createElement("span");
  span.innerText = Todo.text;
  li.appendChild(span);
  if(TodoType === PENDING_KEY || TodoType === COMPLETE_KEY)
  {
    if(Todo.class !== "")
    {
      li.classList.add(Todo.class);
    }
  }
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.classList.add("todo-delete-button");
  deleteButton.addEventListener("click", deleteToDo);
  li.appendChild(deleteButton);
  if(TodoType !== COMPLETE_KEY)
  {
  const completeButton = document.createElement("button");
  completeButton.classList.add("todo-complete-button");
  completeButton.innerText = "⭕️";
  completeButton.addEventListener("click", comleteToDo);
  li.appendChild(completeButton);
  }
  if(TodoType !== PENDING_KEY && TodoType !== COMPLETE_KEY)
  {
    const pendingButton = document.createElement("button");
    pendingButton.classList.add("todo-pending-button");
    pendingButton.innerText = "❗️";
    pendingButton.addEventListener("click", pendingTodo);
    li.appendChild(pendingButton);
  }
  if(TodoType === PENDING_KEY || TodoType === COMPLETE_KEY)
  {
    const returnButton = document.createElement("button");
    returnButton.classList.add("todo-return-button");
    returnButton.innerText = "🔺";
    returnButton.addEventListener("click", returnToDo);
    li.appendChild(returnButton);
  }
  if(TodoType === TODOS_KEY)
  {
    toDoList.appendChild(li);
  }
  else if(TodoType === NOT_TODOS_KEY)
  {
    notToDoList.appendChild(li);
  }
  else if(TodoType === PENDING_KEY)
  {
    pendingList.appendChild(li);
  }
  else if(TodoType === COMPLETE_KEY)
  {
    completeList.appendChild(li);
    console.log(li);
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
  if(toDoRadioGroup.children[0].checked)
  {
    toDos.push(newTodoObj);
  }
  else
  {
    notToDos.push(newTodoObj);
  }  
  paintNewToDo(newTodoObj);
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
  let parsedToDos;
  if (savedToDos !== null) {
    parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(item => paintToDo(item, TODOS_KEY));
  }
  const savedNotToDos = localStorage.getItem(NOT_TODOS_KEY);
  if (savedNotToDos !== null) {
    parsedToDos = JSON.parse(savedNotToDos);
    notToDos = parsedToDos;
    parsedToDos.forEach(item => paintToDo(item, NOT_TODOS_KEY));
  }
  const savedPending = localStorage.getItem(PENDING_KEY);
  if (savedPending !== null) {
    parsedToDos = JSON.parse(savedPending);
    pendingToDos = parsedToDos;
    parsedToDos.forEach(item => paintToDo(item, PENDING_KEY));
  }
  const savedComplete = localStorage.getItem(COMPLETE_KEY);
  if (savedComplete !== null) {
    parsedToDos = JSON.parse(savedComplete);
    completeToDos = parsedToDos;
    console.log(completeToDos);
    parsedToDos.forEach(item => paintToDo(item, COMPLETE_KEY));
  }
}
init();
