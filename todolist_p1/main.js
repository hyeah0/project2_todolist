// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.
// 2. check 버튼을 누르면 할일이 끝나면서 밑줄이간다
// 3. delete 버튼을 누르면 할일이 삭제된다
// 4. 진행중 종료 탭을 누르면 언더바가 이동한다
// 5. 종료탭은, 끝난 아이템만, 진행중인텝은 진행중인 아이템만전체탭을 누르면 다시 전체 아이템으로 돌아온다

// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs =document.querySelectorAll(".task-tabs li");
let mode="all";
let taskList =[];
let filterList=[];


addButton.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value="";})

//랜덤 id 만들기//
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addTask(){
    // let taskInputV = taskInput.value;

    // 객체생성 //
    let task = {
        id: randomIDGenerate(),
        taskInputV: taskInput.value,
        isComplete:false
    }
    ///////////

    taskList.push(task)
    console.log(taskList);
    render();
}

function render(){

    // 모두를 클릭했을때는 tasklist, 진행중을 클릭시에는 filter list 반환
    let list =[];
    if(mode == "all"){
        list = taskList;
    }
    else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = "";

    for(let i=0; i<list.length; i++){

        if(list[i].isComplete == true){
            resultHTML +=`<div class="task">
                            <div class="taskDone">${list[i].taskInputV}</div>
                            <div>
                                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                                <button onclick="deleteTask('${list[i].id}')">Delete</button>
                            </div>
                        </div>`
        }
        else{
        resultHTML += `<div class="task">
                        <div id="taskDetail">${list[i].taskInputV}</div>
                        <div>
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`
        }
        // 클릭시 함수 호출법 
        // 1. addEventListener("click",함수명)
        // 2. onclick = "함수명()"
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;

}

// 2. check 버튼을 누르면 할일이 끝나면서 밑줄이간다

function toggleComplete(id){

    console.log("체크 id: ", id);

    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // taskList[i].isComplete =! 이아닌것을 반환 스위치처럼 사용 가능
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    // render();
    filter();
}

// 3. delete 버튼을 누르면 할일이 삭제된다

function deleteTask(id){
    console.log("삭제 id: " , id);

    for(let i=0; i<taskList.length; i++){

     if(taskList[i].id == id){
         taskList.splice(i,1);
         break;
     }
    }
    console.log(taskList);
    // render();
    filter();

}

// 5. 종료탭은, 끝난 아이템만, 진행중인텝은 진행중인 아이템만전체탭을 누르면 다시 전체 아이템으로 돌아온다
// let tabs =document.querySelectorAll(".task-tabs li");
// let mode="all";
// let filterList=[];

for(let i =1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

function filter(event){
    mode = event.target.id;
    filterList=[];
    
    document.getElementById("under-line").style.width=event.target.offsetwidth + "px";
    document.getElementById("under-line").style.top=event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("under-line").style.left=event.target.offsetLeft + "px";


    // console.log("filter 클릭",event.target.id);
    if(mode == "all"){
        render();
    }
    else if (mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        
        render();
        console.log(filterList);
    }
    else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log(filterList);
    }
}