'use strict'
const inputTask = document.getElementById("input-task")
const toDoList = document.getElementById("todo-list")
const addBtn = document.getElementById("btn-add")
const xBtn = document.getElementsByClassName("close")

const keyCurrentUser = "CURRENT_USER"
const currentUser =  getFromStorage(keyCurrentUser) ? parseUser(getFromStorage(keyCurrentUser)) : null
const keyToDoArr = "TO-DO-LIST"
const toDoArr = getFromStorage(keyToDoArr) ? getFromStorage(keyToDoArr) : []

// Render to-do-list when the page just loads
renderToDoList()

// addEventListener for Add Button
addBtn.addEventListener('click', function(){
    if (inputTask.value == ""){
        alert("Please enter the task")
    } else {
        const todo = new Task(inputTask.value, currentUser.username, false) 
        toDoArr.push(todo)
        saveToStorage(keyToDoArr, toDoArr)
        renderToDoList()
        inputTask.value = ""
    }
})

// Delete task
function deleteTask(name){
    const index = toDoArr.findIndex(item => 
        item.task === name && 
        item.owner === currentUser.username
    )
    toDoArr.splice(index, 1)
    saveToStorage(keyToDoArr, toDoArr)
    renderToDoList()
}

//Toggle task
function toggleTask(){
    document.querySelectorAll('#todo-list li').forEach((listItem) => {
        listItem.addEventListener('click', function (event) {
            event.stopPropagation() //stop propagate to child element
            //toggle class check when clicked
            listItem.classList.toggle('checked')
    
            //find the toggle
            const toggledIndex = toDoArr.findIndex(item =>
                item.owner === currentUser.username &&
                item.task === listItem.textContent.slice(0, -1)
            )
            toDoArr[toggledIndex].isDone = listItem.classList.contains('checked') ? true : false
            toDoArr.splice(toggledIndex, 1, toDoArr[toggledIndex])
            saveToStorage(keyToDoArr, toDoArr);
        })
    })
}



// Define function to render to-do-list
function renderToDoList(){
    toDoList.innerHTML = ''
    const listForCurrUser = toDoArr.filter(task => task.owner === currentUser.username)
    listForCurrUser.forEach((item) => {
        const listRow = document.createElement("li")
        if (item.isDone){
            listRow.classList.toggle("checked")
        }
        listRow.innerHTML = `${item.task}<span class="close" onClick="deleteTask('${item.task}')">×</span>`
        toDoList.appendChild(listRow)
    })
    toggleTask()
}
 
