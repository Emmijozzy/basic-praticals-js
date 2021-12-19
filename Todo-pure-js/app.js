// toggle function
const listHolder = document.querySelector('.list-holder')

// listHolder.onclick = (e) => {
//     if (e.target.className == 'min-btn') {
//         e.target.parentNode.parentNode.classList.toggle('show-func')
//     }
// }
listHolder.addEventListener('click', (e) => {
    if (e.target.className == 'min-btn') {
        e.target.parentNode.parentNode.classList.toggle('show-func')
    }
})

//Date and Day
const day = document.querySelector('.day')
const date = document.querySelector('.date')
const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const today = new Date();
let toDay = today.getDay()
day.innerHTML = days[toDay]
date.innerHTML = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

//Adding to list
const todoValue = document.querySelector('[type = text]')
const submit = document.querySelector('.todo-form')
// console.log(listHolder)

let todoList = !!JSON.parse(localStorage.getItem('todoList'))?  JSON.parse(localStorage.getItem('todoList'))  : [] ; //typeof JSON.parse(localStorage.getItem('todoList')) !== 'object'? [] : JSON.parse(localStorage.getItem('todoList'))
console.log(todoList)  
console.log(todoList.length)  
console.log(typeof todoList)    
todoList = (function() {
    if (typeof todoList == 'string' && !!JSON.parse(localStorage.getItem('todoList')) ) {
        return todoList = []
        } else if (typeof todoList == 'object' && todoList.length == 0) {
            return todoList = []
        } else {
            return todoList = JSON.parse(localStorage.getItem('todoList')) 
        }
    })()
console.log(todoList)    
    // console.log((function() {
    //     if (typeof todolist !== 'string') {
    //         return []
    //     } else {
    //         return todoList
    //     }
    // })())
console.log(!!JSON.parse(localStorage.getItem('todoList')))
console.log(todoList)
submit.addEventListener('submit', addTodo)
function addTodo(e){
    e.preventDefault()
    const inputedTodo = this.querySelector('[type = text]').value;
    const dataBase = {
        inputedTodo,
        done : false
    }
    todoList.unshift(dataBase)
    localStorage.setItem('todoList', JSON.stringify(todoList))
    loadTodo(todoList, listHolder)
    console.log(todoList)
    addToTotal()
    loadStatus()
    submit.reset()
}

function loadTodo(arrStore = [] , NodeElem) {
    NodeElem.innerHTML = arrStore.map((todo, i) => {
        return `<li class="task${i} task">
                    <label for="task${i}">
                        <input type="checkbox" name="task${i}" id="task${i}" data-index = ${i} ${todo.done? 'checked': ''}>
                        <span class="task-des">${todo.inputedTodo}</span>
                    </label>
                    <span class="func">
                        <span class="btn-holder">
                            <span class="min-btn"></span>
                            <span class="min-btn"></span>
                            <span class="min-btn"></span>
                        </span>
                        <span class="edit" data-index = ${i}>Edit</span>
                        <span class="delete" data-index = ${i}>Delete</span>
                    </span>
                </li>`
    }).join('')
}
//check       
listHolder.onclick = (e) => {
    const index = +e.target.dataset.index
    // console.log(todoList[index])
    // console.log(!!index)

   if(!!index || index == 0){
       todoList[index].done = !todoList[index].done
    //    console.log(todoList[index].done)
       localStorage.setItem('todoList', JSON.stringify(todoList))
       loadTodo(todoList, listHolder)
   }
   loadStatus()

}

        
//Clear all 
const clearAll = document.querySelector('#clear-all')       
clearAll.onclick = () => {
    todoList = []
    localStorage.setItem('todoList', JSON.stringify('todoList'))
    loadTodo(todoList, listHolder)
    addToTotal()
    loadStatus()

}
//input in total

function addToTotal(){
 const total = document.querySelector('.total')    
total.innerHTML = typeof todoList == 'string' ? `Total ${0}` : `Total ${todoList.length}`
}
addToTotal()

//load sucess
function loadStatus(){
    let success = 0;
    let pending = 0;
    todoList.forEach(todo => {
       console.log(!!todo.done)

    const check = todo.done || ''
    if(check){
        success++
    } else {
        pending++
    }
    
});
document.querySelector('.success').innerHTML = `Success ${success}`
document.querySelector('.pending').innerHTML = `Pending ${pending}`
}


loadStatus()

loadTodo(todoList, listHolder)

// //Activate function
// listHolder.onclick = (e) => {
    
    
// }
listHolder.addEventListener('click', (e) => {
    console.log(e.target.className)
    console.log(e.target.dataset.index)
    const func = e.target.className;
    const index = +e.target.dataset.index
    if(func == 'edit') {
        todoList.forEach((todo, i) => {
            if(i == index){
                console.log(todo.inputedTodo)
                document.querySelector('[type = text]').value = todo.inputedTodo
            } 
        })
    } else if (func == 'delete') {
        todoList.forEach((todo, i ) => {
            if(i == index) {
                // console.log(delete todoList[i])
                todoList.splice(i, 1)
                localStorage.setItem('todoList', JSON.stringify(todoList))
                // console.log(todo)
                loadTodo(todoList, listHolder)
                loadStatus()
                addToTotal()
            }
        })
    }
})
