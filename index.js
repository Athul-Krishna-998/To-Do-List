const todolist=document.querySelector(".todo-list");
const todobtn=document.querySelector(".todo-button");
const todoinput=document.querySelector(".todo-input");
const filtered=document.querySelector(".filter");

document.addEventListener('DOMContentLoaded',gettodos);
todobtn.addEventListener('click',addlist);
todolist.addEventListener('click',delcheck);
filtered.addEventListener('click',filtertodo);

function addlist(event)
{
    event.preventDefault();
    const tododiv=document.createElement('div');
    const todoli=document.createElement('li');
    const todobutton=document.createElement('button');
    const todobut=document.createElement('button');

    todoli.innerText=todoinput.value;
    todobutton.innerHTML='<i class="fas fa-check"></i>';
    todobut.innerHTML='<i class="fas fa-trash"></i>';
    savelocal(todoinput.value);

    tododiv.classList.add("todo");
    todoli.classList.add("todoitem");
    todobutton.classList.add("todocheck");
    todobut.classList.add("tododelete");

    tododiv.appendChild(todoli);
    tododiv.appendChild(todobutton);
    tododiv.appendChild(todobut);

    todolist.appendChild(tododiv);

    todoinput.value="";
}

function delcheck(e)
{
  const item=e.target;
  if(item.classList[0]==="tododelete")
  {
      const val=item.parentElement;
      val.classList.add("effect");
      removeLocal(val);
       val.addEventListener('transitionend',function()
      {
        val.remove();
      });
  }
  
  if(item.classList[0]==="todocheck")
  {
      item.parentElement.classList.toggle('completed');
  }

}

function filtertodo(e)
{
   const toodos=todolist.childNodes;
   toodos.forEach(function(toDo){
       switch(e.target.value)
       {
           case "all":
           {
               toDo.style.display="flex";
               break;
           }
           case "complete":
               {
                   if(toDo.classList.contains('completed'))
                   {
                     toDo.style.display="flex";
                   }
                   else{
                    toDo.style.display="none";
                   }
                   break;
               }
               case "incomplete":
               {
                 if(toDo.classList.contains('completed'))
                 {
                   toDo.style.display="none";
                 }
                 else{
                     toDo.style.display="flex";
                  }
                  break;
               }
            }
    });
}  

function savelocal(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function gettodos()
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo)
    {
        const tododiv=document.createElement('div');
        const todoli=document.createElement('li');
        const todobutton=document.createElement('button');
        const todobut=document.createElement('button');
        
        todoli.innerText=todo;
        todobutton.innerHTML='<i class="fas fa-check"></i>';
        todobut.innerHTML='<i class="fas fa-trash"></i>';
    
        tododiv.classList.add("todo");
        todoli.classList.add("todoitem");
        todobutton.classList.add("todocheck");
        todobut.classList.add("tododelete");
    
        tododiv.appendChild(todoli);
        tododiv.appendChild(todobutton);
        tododiv.appendChild(todobut);
    
        todolist.appendChild(tododiv);
    });
}

function removeLocal(todo)
{
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const itemindex=todo.children[0].innerText;
    todos.splice(todos.indexOf(itemindex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}