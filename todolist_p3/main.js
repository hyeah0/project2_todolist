// 1. 유저가 값을 입력하고 +버튼을 누르면 task 창에 추가된다.
// 2. check를 누르면 취소선이 생긴다.
// 3. deleat를 누르면 삭제된다.
// 4. 진행중탭, 종료탭을 누르면 해당하는 할일만 보여진다.

// 랜덤 아이디
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

// ==================================== //
let inputTask = document.querySelector(".inputTask");
let inputButton = document.querySelector(".inputButton");
let taskList = [];


// ==================================== //
inputButton.addEventListener("mousedown",input);
inputTask.addEventListener("focus",function(){inputTask.value = "";});

// input창 엔터치면 task에 입력
inputTask.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        input(event);
    }
});

// ==================================== //
function input(){
    let inputTaskValue = inputTask.value;

    let task = {
        id : randomIDGenerate(),
        isComplete : false,
        inputTaskValue
    }
    taskList.push(task);
    console.log("입력한 할일 : " , taskList);
    
    render();
}

function render(){
    let result = ""
    for(let i=0; i<taskList.length; i++){
    
        result += `<div class="task" id="${taskList[i].id}">
                   <div>
                        ${taskList[i].inputTaskValue}
                    </div>
                    <div>
                        <button class="check"></button>
                        <button class="delete"></button>
                    </div>
                    </div>`
    }
    document.querySelector(".task-board").innerHTML = result;
}

