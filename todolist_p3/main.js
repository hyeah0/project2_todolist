// 1. 유저가 값을 입력하고 +버튼을 누르면 task 창에 추가된다.
// 2. check를 누르면 취소선이 생긴다.
// 3. delete를 누르면 삭제된다.
// 4. 진행중탭, 종료탭을 누르면 해당하는 할일만 보여진다.

// 랜덤 아이디
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

// ==================================== //
let inputTask = document.querySelector(".inputTask");
let inputButton = document.querySelector(".inputButton");
let taskList = [];
let filterList = [];

let tabs = document.querySelectorAll(".task-tab li");
console.log(tabs);

let mode ="all"

// ====addevent================================ //
// input
inputButton.addEventListener("mousedown",input);
inputTask.addEventListener("focus",function(){inputTask.value = "";});
// input창 엔터치면 task에 입력
inputTask.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        input(event);
    }
});

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}



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
    
    inputTask.value = "";
    // ㄴinputTask 작성후 공란으로 설정
    render();
}


function render(){
    let result = "";
    let list = [];

    if(mode == "all"){
        list = taskList;
    }
    else if(mode == "doing" || mode == "done"){
        list = filterList;
    }

    for(let i=0; i<list.length; i++){

        if(list[i].isComplete == true){
            result += `<div class="task">
                    <div class="taskDone">
                        ${list[i].inputTaskValue}
                    </div>
                    <div>
                        <button class="check" onclick="checkButton('${list[i].id}')"></button>
                        <button class="delete" onclick="deleteTask('${list[i].id}')"></button>
                    </div>
                    </div>`
        }
        else{
            result += `<div class="task">
                    <div>
                        ${list[i].inputTaskValue}
                    </div>
                    <div>
                        <button class="check" onclick="checkButton('${list[i].id}')"></button>
                        <button class="delete" onclick="deleteTask('${list[i].id}')"></button>
                    </div>
                    </div>`
        }
    }
    document.querySelector(".task-board").innerHTML = result;
}

//체크를 누르면 iscomplete 값이 변한다
function checkButton(id){
    console.log("체크id : " ,id);

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete =!taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
    // filter();
}

//삭제를 누르면 값이 삭제된다
function deleteTask(id){

    console.log("삭제id : " , id)
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].id ==id){
                taskList.splice(i,1);
                break;
            }
        }
    console.log(taskList);
    render();
    // filter();
   }

// 탭이 전체, 진행중, 취소탭으로 변경시 값이 변경한다.
function filter(event){
    mode = event.target.id;
    console.log("mode: ", mode);
    
    filterList =[];
    
    if(mode == "all"){
        render();
    }
    else if( mode == "doing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
            console.log("doing :",filterList);
        }
    }
    else if( mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
            console.log("done :" , filterList);
        }
    }
    render();
}