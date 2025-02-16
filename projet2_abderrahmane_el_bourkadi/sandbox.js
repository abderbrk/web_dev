
// partie d'ajout de taches
//var trash=document.getElementsByClassName('far fa-trash-alt delete');
var task_list=document.getElementsByClassName('list-group todos mx-auto text-light')[0];
var new_task = document.querySelector('input[name="add"]');
function add_task(){
   var  todo = new_task.value;
   
   if(todo!="") {
    
       task_list.innerHTML+=`<li class="list-group-item">
                           <span>${todo}</span>
                           <i  class="far fa-trash-alt delete"></i>
                            </li>`;
                  new_task.value = ""; 
             }
             


}

//-----------------------------------------

// partie filtrage de recherche

var tasks =document.getElementsByClassName('list-group-item d-flex justify-content-between align-items-center');
//var search=document.querySelector('input[name="search"]');


document.getElementById("search").addEventListener("input",function(){
    let searchi=document.getElementById("search").value;
    let tasks = document.querySelectorAll("ul li");
    let all = Array.from(tasks);
    all.forEach(item=>{
        
        if (!(item.innerText.includes(searchi))){
            item.style.display = "none";
        }
        else{
            item.style.display = "flex";
        }
    })
});

document.forms[1].addEventListener("submit",(e)=>{
    e.preventDefault();
});

document.forms[0].addEventListener("submit",(e)=>{
    e.preventDefault();
});


