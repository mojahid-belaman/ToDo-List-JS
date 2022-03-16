let myInput = document.querySelector('.add-task input');
let btnAdd = document.querySelector('.add-task span');
let noTask = document.querySelector('.no-task-content');
let Task = document.querySelector('.task-content');
let myCount = document.querySelector('.task-count span');
let myComplete = document.querySelector('.task-complete span');
let clearBtn = document.querySelector('.clear');
let fallBtn = document.querySelector('.finish-all');
let arr = [];
let box;

window.onload = function () {
    myInput.focus();
}

btnAdd.onclick = function () {
    
    if (myInput.value === "" || onlySpace(myInput.value)) {
        
        swal({
            icon: "error",
            title: "Invalid Input!"
        });
    }
    else if (checkExist(myInput.value, arr)) {
        
        swal({
            icon: "error",
            title: "This Task Exist!"
        });
        myInput.focus();
    }
    else {
        noTask = document.querySelector('.no-task-content');
        if (document.body.contains(document.querySelector('.no-task-content')))
            noTask.remove();
        createTask();
        box = document.querySelector('.task-content').lastChild.innerText;
        box = box.substring(0, box.indexOf('\n'));
        arr.push(box);
        calculateTask();
    }
}

clearBtn.onclick = function () {

    let myVar = Task.children;
    let i = 0;

    while (i < myVar.length) {
        myVar.item(i).remove();
    }
    while (arr.length > 0)
        arr.pop();
    
    createNoTask();
    calculateTask();
}

fallBtn.onclick = function () {
    
    let myVar = Task.children;
    let i = 0;

    while (i < myVar.length) {
        myVar.item(i).classList.toggle('finished');
        i++;
    }
    calculateTask();
}

function createTask() {
    
    let mainSpan = document.createElement('span');
    mainSpan.setAttribute('class', 'task-box');

    let deleteSpan = document.createElement('span');
    deleteSpan.setAttribute('class', 'delete');

    let finishSpan = document.createElement('span');
    finishSpan.setAttribute('class', 'finish');

    let mainText = document.createTextNode(myInput.value);
    let deleteText = document.createTextNode('Delete');
    let finishText = document.createTextNode('Finish');

    mainSpan.appendChild(mainText);
    deleteSpan.appendChild(deleteText);
    finishSpan.appendChild(finishText);

    mainSpan.appendChild(finishSpan);
    mainSpan.appendChild(deleteSpan);

    Task.append(mainSpan);

    myInput.value = "";
    myInput.focus();

}

function onlySpace(str) {
    return str.trim().length === 0;
}

function checkExist(text, arr) {
    if (arr.length) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === text)
                return 1;
        }
    }
    return 0;
}

document.addEventListener('click', function (e) {
    
    if (e.target.className == 'delete') {

        let myVar = e.target.parentElement.innerText;
        myVar = myVar.substring(0, myVar.indexOf('\n'));
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === myVar)
                arr.splice(index, 1);
        }

        e.target.parentElement.remove();

        if (Task.childElementCount === 0)
            createNoTask();
        calculateTask();
    }
    if (e.target.className == 'finish') {
        e.target.parentElement.classList.toggle('finished');
        calculateTask();
    }
})

function createNoTask() {
    
    let noTaskSpan = document.createElement('span');
    noTaskSpan.setAttribute('class', 'no-task-content');

    let taskText = document.createTextNode('No Task Add');
    noTaskSpan.appendChild(taskText);

    Task.append(noTaskSpan);
}

function calculateTask() {

    myCount.innerHTML = document.querySelectorAll('.task-box').length;

    myComplete.innerHTML = document.querySelectorAll('.task-box.finished').length;
    
}