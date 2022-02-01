// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.
// 2. delete 버튼을 누르면 할일이 삭제된다
// 3. check 버튼을 누르면 할일이 끝나면서 밑줄이간다
// 4. 진행중 종료 탭을 누르면 언더바가 이동한다
// 5. 종료탭은, 끝난 아이템만, 진행중인텝은 진행중인 아이템만전체탭을 누르면 다시 전체 아이템으로 돌아온다

// 1. 유저가 할일을 적고 + 버튼을 클릭하면 할일이 추가된다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList =[]

addButton.addEventListener("click",addTask);
taskInput.addEventListener("focus",function(){taskInput.value="";})


function addTask(){
    let taskInputV = taskInput.value;
    taskList.push(taskInputV)
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = "";

    for(let i=0; i<taskList.length; i++){
        // resultHTML = taskList[i];
        // console.log(resultHTML);
        resultHTML += `<div class="task">
                        <div>${taskList[i]}</div>
                        <div>
                            <button>Cheack</button>
                            <button>Delete</button>
                        </div>
                    </div>`
    }
    
    document.getElementById("task-board").innerHTML = resultHTML;

}

