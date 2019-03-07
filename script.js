// Variables

let listName = [],
    taskName = [];

// Initial State Setup
$(`#taskNewName`).hide();
$(`#jumbo2`).hide();


// Models (Classes) - One for Lists and One for Tasks

class List {
    constructor(listName) {
        this.name = listName;
        this.chosen = false;
        this.tasks = [];
    }

    changeListName(listName) {
        this.name = listName;
    }

    listPicked() {
        this.chosen = true;
    }

    listUnPicked() {
        this.chosen = false;
    }
}

class Task {
    constructor(taskName) {
        this.name = taskName;
        this.complete = false;
    }

    changeTaskName(taskName) {
        this.name = taskName;
    }

    completeTask() {
        this.complete = true;
    }

    unCompleteTask() {
        this.complete = false;
    }
}

// Functions to handle lists


function addList(list, event) {
    switch (event.key) {
        case 'Enter':
            list = list.toString();
            let simpleTest = listName.filter(function (listName) {
                return listName.name === list;
            });
            if (list === '' || simpleTest.length > 0) {
                simpleTest = [];
                alert('You entered the same list name as before or you entered a blank list name');
            } else {
                console.log('listName.length == ', listName.length);
                listName[listName.length] = new List(list);
                console.log('list =', list);
                reWriteList(listName);
            }
            $('#listNewName').val('');
            break;
    }
}

function changeListName(list, item, event) {
    switch (event.key) {
        case 'Enter':
            list = list.toString();
            let simpleTest = listName.filter(function (listName) {
                return listName.name === list;
            });
            if (list === '' || simpleTest.length > 0) {
                simpleTest = [];
                alert('You entered the same list name as before or you entered a blank list name');
            } else {
                listName[item].changeListName(list);
                reWriteList(listName);
            }
            break;
    }
}

function reWriteList(listName) {
    $(`.listFlex`).remove();
    for (let i = 0; i < listName.length; i++) {
        $(`#listName${i}`).remove();
    }
    for (let i = 0; i < listName.length; i++) {
        $(`#theLists`).append(`<div id="listName${i}" class="listFlex"><i id="circleHole${i}" onclick="lcheckMe(${i})" class="far fa-circle"></i><i id="circleCheck${i}" onclick="lunCheckMe(${i})" class="fas fa-check-circle"></i><input class="listChangeable" size="22" value="${listName[i].name}" onclick="document.execCommand('selectAll',false,null)" onkeyup="changeListName(this.value, ${i}, event)" ></input><i id="deleteMe" onclick="ldeleteMe(${i})" class="fas fa-minus-circle"></i>
        </div>`)
    }
    for (let i = 0; i < listName.length; i++) {
        if (listName[i].chosen) {
            $(`#circleHole${i}`).hide();
            $(`#circleCheck${i}`).show();
        } else {
            $(`#circleCheck${i}`).hide();
            $(`#circleHole${i}`).show();
        }
    }
}

function reWriteTask(taskName) {
    $(`.taskFlex`).remove();
    for (let t = 0; t < taskName.length; t++) {
        $(`#taskName${t}`).remove();
    }
    for (let t = 0; t < taskName.length; t++) {
        $(`#theTasks`).append(`<div id="taskName${t}" class="taskFlex"><i id="tcircleHole${t}" onclick="tcheckMe(${t})" class="far fa-circle"></i><i id="tcircleCheck${t}" onclick="tunCheckMe(${t})" class="fas fa-check-circle"></i><input class="taskChangeable" size="30" value="${taskName[t].name}" onclick="document.execCommand('selectAll',false,null)" onkeyup="changeTaskName(this.value, ${t}, event)"></input><i id="deleteMe" onclick="tdeleteMe(${t})" class="fas fa-minus-circle"></i>
        </div>`)
    }
    for (let t = 0; t < taskName.length; t++) {
        if (taskName[t].complete) {
            $(`#tcircleHole${t}`).hide();
            $(`#tcircleCheck${t}`).show();
        } else {
            $(`#tcircleCheck${t}`).hide();
            $(`#tcircleHole${t}`).show();
        }
    }
    for (let l = 0; l < listName.length; l++) {
        if (listName[l].chosen) {
            listName[l].tasks = taskName;
        }
    }
}

function lcheckMe(item) {
    $(`#circleHole${item}`).hide();
    $(`#circleCheck${item}`).show();
    listName[item].listPicked();
    $(`#listNewName`).hide();
    $(`#theLists`).hide();
    for (i = 0; i < listName.length; i++) {
        if (listName[i].chosen) {
            $(`h3`).html(`<h3><i id="circleCheck${i}" onclick="lunCheckMe(${i})" class="fas fa-check-circle"></i>${listName[i].name} Tasks`);
            taskName = listName[i].tasks;
        }
    }
    $(`#taskNewName`).show();
    $(`#jumbo2`).show();
    reWriteTask(taskName);

}

function lunCheckMe(item) {
    $(`#circleCheck${item}`).hide();
    $(`#circleHole${item}`).show();
    listName[item].listUnPicked();
    $(`#listNewName`).show();
    $(`#theLists`).show();
    reWriteList(listName);
    $(`h3`).html(`<h3>Tasks</h3>`);
    $(`#taskNewName`).hide();
    $(`#jumbo2`).hide();
    console.log('taskName.length = ',taskName.length);
    for (let t = 0; t < taskName.length; t++) {
        $(`#taskName${t}`).remove();
    }
    taskName = [];
}

function ldeleteMe(item) {
    listName.splice(item, 1);
    reWriteList(listName);
}

$('.listChangeable').on('click', function () {
    document.execCommand('selectAll', false, null);
});

$('.taskChangeable').on('click',function () {
    document.execCommand('selectAll', false, null);
})


// Functions to handle tasks


function addTask(task, event) {
    switch (event.key) {
        case 'Enter':
            task = task.toString();
            let simpleTest = taskName.filter(function (taskName) {
                return taskName.name === task;
            });
            if (task === '' || simpleTest.length > 0) {
                simpleTest = [];
                alert('You entered the same task name as before or you entered a blank task name');
            } else {
                console.log('taskName.length =', taskName.length);
                taskName[taskName.length] = new Task(task);
                reWriteTask(taskName);
// todo write the tasks to the correct listName
            }


            $('#taskNewName').val('');
            break;
    }
}