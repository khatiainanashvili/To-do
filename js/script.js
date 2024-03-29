const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUl = document.getElementById('todos')


const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo));
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value 
    if(todo) {
        todoText = todo.text
    }

   if (todoText) {
     const todoEl = document.createElement('li')

     if (todo && todo.completed) {
        todoEl.classList.add('completed')
     }
     todoEl.innerText= todoText

     todoEl.addEventListener('click', () =>
     { todoEl.classList.toggle('completed')
       updateLS()
     })


   
//touch Event

let tapedTwice = false;

todoEl.addEventListener('touchstart', tapHandler)


function tapHandler(e) {
        if(!tapedTwice) {
            tapedTwice = true;
            setTimeout( function() { tapedTwice = false; }, 300 );
            return false;
        }
     e.preventDefault()
    todoEl.remove()
       updateLS()
     }

//////////////
     
     
   todoEl.addEventListener('contextmenu', (e) => {
     e.preventDefault()
     todoEl.remove()
        updateLS()
     } )
     todosUl.appendChild(todoEl)
     input.value= ''
   }
   updateLS()
   
}



function updateLS() {
    todosEl = document.querySelectorAll('li')
    const todos = []
    todosEl.forEach(el => {
        todos.push({
            text: el.innerText,
            completed: el.classList.contains('completed')
        })

    })
   
    localStorage.setItem('todos', JSON.stringify(todos) )
}

