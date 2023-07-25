const todoInput = document.querySelector("#todo");
const cardBodyTop = document.querySelectorAll(".card-body")[0];
const cardBodyBottom = document.querySelectorAll(".card-body")[1];
const findinputTodos = document.querySelector("#filter");
const clearTasks = document.querySelector("#clear-todos");
const todoList = document.querySelector(".list-group");

eventListeners();

function eventListeners(){
    cardBodyTop.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded" , loadTodos);
    cardBodyBottom.addEventListener("click",removeTodo);
    clearTasks.addEventListener("click",clearAllTodos);
    findinputTodos.addEventListener("keyup",findTodos);

};


function findTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    

    listItems.forEach(function(item){
        const text = item.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            item.setAttribute("style","display : none !important");
        }
        else{
            item.setAttribute("style" , "display: block");
        }
    })
}


function clearAllTodos(){
    if(confirm("Tümünü Silmek İstiyor musunuz?")){
        todoList.innerHTML = "";
        localStorage.removeItem("todos");
    }

    


}



function removeTodo(e){

    if(e.target.className === "fa fa-remove"){
        const deleted = e.target.parentElement.parentElement.textContent;
        e.target.parentElement.parentElement.remove();
        alertify("success" , "Todo Başarıyla silindi")
        removeTodoFromLocalStorage(deleted);
    }

}

function removeTodoFromLocalStorage(text){
    todos = getLocalStorage();
    
    todos.forEach(function(todo,index){
        if (todo === text){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos" , JSON.stringify(todos));

}

function loadTodos(){
    let todos = getLocalStorage();
    todos.forEach(element => {
        addToList(element);
    });
};

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        alertify("danger","Boş Bir Todo oluşturamazsınız");
    }
    else{
        addToList(newTodo);
        
        alertify("success","Yeni Bir Todo Eklendi");
        addToLocalStorage(newTodo);

    }



    e.preventDefault();

}

function addToList(text){
    const newElement = document.createElement("li");

    const link = document.createElement("a");
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    newElement.className = "list-group-item d-flex justify-content-between";

    newElement.appendChild(document.createTextNode(text));
    newElement.appendChild(link);

    const ul = document.querySelector(".list-group");
    ul.appendChild(newElement);



    todoInput.value = "";
}

function alertify(type, message){

    const newAlert = document.createElement("div");
    newAlert.className = `alert alert-${type}`
    newAlert.textContent = message;

    cardBodyTop.appendChild(newAlert);

    setTimeout(function(){
        cardBodyTop.removeChild(cardBodyTop.lastChild);

    },1000);
}



function getLocalStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
    
}



function addToLocalStorage(text){

    todos = getLocalStorage();

    todos.push(text);

    localStorage.setItem("todos" , JSON.stringify(todos));


}