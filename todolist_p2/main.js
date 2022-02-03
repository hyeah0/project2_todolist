// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.
// 2. check 버튼을 누르면 할일이 끝나면서 밑줄이간다
// 3. delete 버튼을 누르면 할일이 삭제된다
// 4. 진행중 종료 탭을 누르면 언더바가 이동한다
// 5. 종료탭은, 끝난 아이템만, 진행중인텝은 진행중인 아이템만전체탭을 누르면 다시 전체 아이템으로 돌아온다



let taskInput = document.querySelector(".task-input");
let taskButtoon = document.querySelector(".button-add");
let todolist =[]
let filteredList = [];
let selectedMenu = "tab-all";

taskButtoon.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value="";})

// 랜덤 아이디 만들기
function randomIDGenerator() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

// 1-1 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.

function addTask(){
    taskValue = taskInput.value;

    let task = {
        content: taskValue,
        isComplete: false,
        id: randomIDGenerator()
    }
    todolist.push(task);
    console.log(todolist);
    render();

}

// 1-2 유저가 할일을 적고 + 버튼을 클릭하면 task-board에 추가된다

function render(){
    let result = "";
    list=[];

    // if(selectedMenu === "tab-all"){
    //     list = taskList;
    // }
    // else{
    //     list = filteredList;
    // }

    for(let i=0; i<list.length; i++){

        if(list[i].isComplete){
            result += `<div class="task task-done" id="${list[i].id}">
                    <span>${list[i].content}</span></div>
                    <div class="button-box"> 
                            <button onclick="toggleDone('${list[i].id}')">Done</button>
                            <button onclick="deleteTask'${list[i].id}')">Delete</button>
                    </div>`
        }
        else{
            result += `<div class="task" id="${list[i].id}">
                   <span>${list[i].content}</span></div>
                   <div class="button-box"> 
                        <button onclick="toggleDone('${list[i].id}')">Done</button>
                        <button onclick="deleteTask'${list[i].id}')">Delete</button>
                   </div>`
        }
    }
    document.getElementById("task-board").innerHTML = result;
}

