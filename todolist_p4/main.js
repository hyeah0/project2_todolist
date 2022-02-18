function randomIDGenerator(){
    return "_" + Math.random().toString(36).substr(2,9);
}



let inputText = document.querySelector('#input-text');
let inputButton = document.querySelector('#input-button');
let todolist = [];
let filterList = [];


inputButton.addEventListener("mousedown",addTask);
inputText.addEventListener("keyup",function(event){if(event.keyCode ===13){
    addTask(event);
}})

function addTask(){
    let inputTextValue = inputText.value;

    let inputlist = {
        id : randomIDGenerator(),
        iscomplete : false,
        inputTextValue
    }

    
    todolist.push(inputlist);
    console.log(todolist);
  
    inputText.value = '';
    render();
}


function render(){

    let result = ""
    
    for(let i=0; i<todolist.length; i++){

        result += 
                `<div id="task-input">
                    ${todolist[i].inputTextValue}
                </div>
                <div>
                <button>DONE</button>
                <button>DELETE</button>
                </div>`


    }
    document.getElementById('task-board').innerHTML = result;


}
    