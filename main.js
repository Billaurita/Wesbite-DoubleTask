let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach(item => {
    let li = item.parentElement;

    item.addEventListener("click", () => {

        sideMenu.forEach(link => {
            link.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});

let menuBar = document.querySelector(".bx-menu");
let sideBar = document.querySelector(".sidebar");
menuBar.addEventListener("click", () => {
    sideBar.classList.toggle("hide");
});

let switchMode = document.getElementById("switch-mode");
switchMode.addEventListener("change", (e) => {
    if(e.target.checked){
        document.body.classList.add("dark");
    }else{
        document.body.classList.remove("dark");
    }
});

const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;
// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let li = ""
    if(todos) {
        todos.forEach((todo, id) => {
            // if todo status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                li += `<li class="task">
                      <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                      </label>
                      <div class="settings">
                        <i onclick="showMenu(this)" class='bx bx-dots-horizontal-rounded'></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')"><i class='bx bx-edit'></i>Edit</li>
                            <li onclick="deleteTask(${id})"><i class='bx bx-trash'></i>Delete</li>
                        </ul>
                      </div>
                   </li>`;
            }
        });
    }
    // if li isn't empty, insert this value inside taskbox else insert span
    taskBox.innerHTML = li || `<span>You don't have any task here<span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    // getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        // removing show class from the task menu on the document click
        if(e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    // removing selected task form array/todos
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    // removing selected task form array/todos
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTask) {
    // getting paragraph that contains task name
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task to completed
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        // updating the status of selected task to pending
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditedTask) { // if editedTask isn't true
            if(!todos) { // if tofo isn't exits, pass an empty array to todos
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo); // adding new task to todos
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";  
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
        sideBar.classList.add("hide");
    }
})

if(window.innerWidth < 768){
    sideBar.classList.add("hide");
};