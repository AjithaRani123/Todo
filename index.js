let todoItemsContainerElement = document.getElementById("todoItemsContainer");
let todoAddButtonElement = document.getElementById("todoAddButton");
let todoSaveButtonElement = document.getElementById("todoSaveButton");
let todoClearButtonElement = document.getElementById("todoClearButton");

// this function used when we refresh the browser then what we save the todoListElement that will print 
function getTodoListFromLocalStorage() {
    let stringifedTodoList = localStorage.getItem("todoList");
    //stringifedTodoList to parsedTodoList
    let parsedTodoList = JSON.parse(stringifedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
//getTodoListFromLocalStorage give the todoListElement 
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
//onclick on save button the todoListElement converting into stringify to store in localStorage
todoSaveButtonElement.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
//function that add todoUserInputValue to MyTask
function onAddTodo() {
    let todoUserInputElement = document.getElementById("todoUserInput");
    let todoUserInputValue = todoUserInputElement.value;
    if (todoUserInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todosCount = todosCount + 1;
    //newTodos was add to mytask 
    let newTodo = {
        text: todoUserInputValue,
        uniqueNo: todosCount,
    };
    todoList.push(newTodo);
    creatAndAppendTodo(newTodo);
    todoUserInputElement.value = "";

}
//onclick function for todoAddButtonElement
todoAddButtonElement.onclick = function() {
    onAddTodo();
}
// this function that checking the todoUserInputElements
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxIdElement = document.getElementById(checkboxId);
    let todoLabelElement = document.getElementById(labelId);
    todoLabelElement.classList.toggle("checked");
    // it is for find the index of todoListElement
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }

    });
    //its used to checked the todoListElement when the browser refresh
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}
//function that  delete's  the deleteTodoElementIndex from  todoList
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainerElement.removeChild(todoElement);
    //its used to findIndex in the todoList and delete the todoElements in the todoListElement 
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}
//this function is used to clear the listed in from todoLabelContainer
todoClearButtonElement.onclick = function() {
    let text = "Are You Sure To Clear All From My Task";

    if (confirm(text) === true) {
        todoList = [];
        todoItemsContainerElement.remove();
    }
};
//function that store the todoUserInputElements in MyTask 
function creatAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo; //todoId in todoListElement
    let checkboxId = "checkbox" + todo.uniqueNo; //checkbox in todoInputElement
    let labelId = "label" + todo.uniqueNo; //label in todoLabelElement
    // listContainer in my Task
    let todoListElement = document.createElement("li");
    todoListElement.id = todoId;
    todoListElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainerElement.appendChild(todoListElement);
    //checkbox in listContainer
    let todoInputElement = document.createElement("input");
    todoInputElement.type = "checkbox";
    todoInputElement.id = checkboxId;
    todoInputElement.checked = todo.isChecked;
    todoInputElement.classList.add("checkbox-input");
    //onclick function for todoInputElement
    todoInputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoListElement.appendChild(todoInputElement);
    //labelContainer in listContainer
    let todoLabelContainer = document.createElement("div");
    todoLabelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoListElement.appendChild(todoLabelContainer);
    //label in labelContainer
    let todoLabelElement = document.createElement("label");
    todoLabelElement.id = labelId;
    todoLabelElement.setAttribute("for", checkboxId);
    todoLabelElement.classList.add("checkbox-label");
    todoLabelElement.textContent = todo.text;


    // when it todoListElement isChecked then it add line-through on the todoLabelElement
    if (todo.isChecked === true) {
        todoLabelElement.classList.add("checked");

    }
    todoLabelContainer.appendChild(todoLabelElement);

    //todotaskCompletedContainer is the container to todotaskCompleted
    let todotaskCompletedContainer = document.createElement("div");
    todoLabelContainer.appendChild(todotaskCompletedContainer);
    //its checked when the browse in localStorage is refereshed give task is completed
    if (todo.isChecked === true) {
        let todotaskCompleted = document.createElement("p");
        todotaskCompleted.classList.add("completed");
        todotaskCompleted.textContent = "Completed";
        todotaskCompletedContainer.appendChild(todotaskCompleted);

    }
    //or else it show InComplete
    else {
        let todotaskCompleted = document.createElement("p");
        todotaskCompleted.classList.add("incompleted");
        todotaskCompleted.textContent = "InCompleted";
        todotaskCompletedContainer.appendChild(todotaskCompleted);
    }

    //deleteiconcontainer in labelContainer
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    todoLabelContainer.appendChild(deleteIconContainer);

    //deleteicon in deleteiconcontainer
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    //onclick for deleteicon
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}
//for loop for todoList
for (let todo of todoList) {
    creatAndAppendTodo(todo);
}
