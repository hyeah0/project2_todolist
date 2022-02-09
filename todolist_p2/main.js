// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.
// 2. check 버튼을 누르면 할일이 끝나면서 밑줄이간다
// 3. delete 버튼을 누르면 할일이 삭제된다
// 4. 진행중 종료 탭을 누르면 언더바가 이동한다
// 5. 종료탭은, 끝난 아이템만, 진행중인텝은 진행중인 아이템만전체탭을 누르면 다시 전체 아이템으로 돌아온다

// 랜덤 아이디 만들기
function randomIDGenerator() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

let taskInput = document.querySelector(".task-input");
let taskButtoon = document.querySelector(".button-add");
let todolist =[]
let filterList = [];

let tabs = document.querySelectorAll(".tab-type div")
console.log(tabs);
let mode = "tab-all";

// =========================================================

taskButtoon.addEventListener("mousedown",addTask);
// ㄴ "클릭"으로 할경우 클릭 2번 해야함, 
// "마우스다운" 마우스 버튼을 누르고 있다가 뗄때 발생
taskInput.addEventListener("keyup",function(event){if(event.keyCode === 13){
    addTask(event);
}})
// "keyup"은 이벤트를 사용해야하며, keycode 13(enter)을 누르면 함수가 실행된다
taskInput.addEventListener("focus",function(){taskInput.value="";})



for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}


// 1-1 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.

function addTask(){
    let taskValue = taskInput.value;

    let task = {
        id: randomIDGenerator(),
        isComplete: false,
        taskValue
    }
    todolist.push(task);
    console.log(todolist);

    taskInput.value ="";
    render();

}

// 1-2 유저가 할일을 적고 + 버튼을 클릭하면 task-board에 추가된다

function render(){
    let result = "";
    list=[];

    if(mode == "tab-all"){
        list = todolist;
    }
    else{
        list = filterList;
    }

    for(let i=0; i<list.length; i++){

        if(list[i].isComplete == true){
            result += `<div class="task"> 
                    <div class = "task-done">
                        ${list[i].taskValue}
                    </div>
                    <div class="button-box"> 
                            <button onclick="toggleDone('${list[i].id}')">Done</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                    </div>`
        }
        else{
            result += `<div class="task"> 
                        <div>
                            ${list[i].taskValue}
                        </div>
                        <div class="button-box"> 
                                <button onclick="toggleDone('${list[i].id}')">Done</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                        </div>`
        }
    }
    document.getElementById("task-board").innerHTML = result;
    
}


// 3. delete 버튼을 누르면 할일이 삭제된다
function deleteTask(id){
    console.log("삭제id : ", id);
    
    for(let i=0; i<todolist.length; i++){
        if(todolist[i].id == id){
            todolist.splice(i,1);
            break;
        }
    }
    console.log(todolist);
    render();
}



// done버튼을 누르면 삭제선이 생긴다
function toggleDone(id){
    console.log("체크id : " ,id);

    for(let i=0; i<todolist.length; i++){

        if(todolist[i].id == id){
            todolist[i].isComplete =! todolist[i].isComplete;
            break;
        }
    }
    console.log(todolist);
    render();
}

// 4. 진행중 종료 탭을 누르면 언더바가 이동한다

// 탭 클릭시 해당하는 내용이 보여진다.

function filter(event){

    mode = event.target.id;
    console.log("mode : ", mode);
    
    filterList =[];

    if(mode == "tab-all" ){
        render();
    }
    else if( mode == "tab-not-done"){
        for(let i=0; i<todolist.length; i++){
            if(todolist[i].isComplete == false){
                filterList.push(todolist[i]);
            }
            console.log("doing : " , filterList);
        }

    }
    else if( mode == "tab-done"){
        for(let i=0; i<todolist.length; i++){
            if(todolist[i].isComplete == true){
                filterList.push(todolist[i]);
            }
            console.log("done : ", filterList);
        }
    }
    render();
}

let tabUnderline = document.getElementById("tab-underline");
let tabMenu = document.querySelectorAll(".tab-type div");

function horizontalIndicator(e){
    tabUnderline.style.left = e.offsetLeft + "px";
    tabUnderline.style.width = e.offsetWidth + "px";
    tabUnderline.style.top =  e.offsetHeight-3 + "px"
    // tabUnderline.style.top = e.offsetTop-3 + e.offsetHeight + "px"
}

tabMenu.forEach((menu) =>
    menu.addEventListener("click", (e) =>horizontalIndicator(e.currentTarget))
);