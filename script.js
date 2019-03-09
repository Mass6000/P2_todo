// Variables

let listName = [],
    taskName = [];


// Models (Classes) - One for Lists and One for Tasks

class List {
    constructor(listName, selected) {
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
    constructor(taskName, complete) {
        this.name = taskName;
        this.complete = complete;
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


// Initial State Setup

$(`#taskNewName`).hide();
$(`#jumbo2`).hide();

(function () {
    if (localStorage.jsctdData) {
        mydata = JSON.parse(localStorage.jsctdData);
        for (let l = 0; l < mydata.length; l++) {
            taskName = [];
            listName[l] = new List(mydata[l].name, mydata[l].chosen);
            for (let t = 0; t < mydata[l].tasks.length; t++) {
                taskName[t] = new Task(mydata[l].tasks[t].name, mydata[l].tasks[t].complete);
            }
            listName[l].tasks = taskName;
            console.log(`listName[${l}].tasks = `, listName[l].tasks, ` = taskName =`, taskName);
        }
    }
    reWriteList(listName);
})();


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
                let chosen = false;
                listName[listName.length] = new List(list, chosen);
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
    setMyData();
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
    for (let t = 0; t < taskName.length; t++) {
        $(`#taskName${t}`).remove();
    }
    taskName = [];
}

function ldeleteMe(item) {
    $(`#listName${item}`).animate({
        opacity: '0'
    }, 1000, function() {
        listName.splice(item, 1);
        reWriteList(listName);
        }
    );
}

$('.listChangeable').on('click', function () {
    document.execCommand('selectAll', false, null);
});

$('.taskChangeable').on('click', function () {
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
                let complete = false;
                taskName[taskName.length] = new Task(task, complete);
                reWriteTask(taskName);
// todo write the tasks to the correct listName
            }


            $('#taskNewName').val('');
            break;
    }
}

function changeTaskName(task, item, event) {
    switch (event.key) {
        case 'Enter':
            task = task.toString();
            let simpleTest = taskName.filter(function (taskName) {
                return taskName.name === task;
            });
            if (task === '' || simpleTest.length > 0) {
                simpleTest = [];
                alert('You entered the same task name as before or you entered a black task name');
            } else {
                taskName[item].changeTaskName(task);
                reWriteTask(taskName);
            }
            break;
    }
}

function reWriteTask(taskName) {
    setMyData(listName);
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
            // $(`#taskName${t}`).css('text-decoration', 'line-through');
            $(`#taskName${t}`).css('background-color', '#e5f2e5');
        } else {
            $(`#tcircleCheck${t}`).hide();
            $(`#tcircleHole${t}`).show();
            $(`#taskName${t}`).css('text-decoration', 'none');
        }
    }
    for (let l = 0; l < listName.length; l++) {
        if (listName[l].chosen) {
            listName[l].tasks = taskName;
        }
    }
}

function tcheckMe(item) {
    $(`#tcircleHole${item}`).hide();
    $(`#tcircleCheck${item}`).show();
    taskName[item].completeTask();
    reWriteTask(taskName);
}

function tunCheckMe(item) {
    $(`#tcircleCheck${item}`).hide();
    $(`#tcircleHole${item}`).show();
    taskName[item].unCompleteTask();
    reWriteTask(taskName);
}

function tdeleteMe(item) {
    taskName.splice(item, 1);
    reWriteTask(taskName);
}

function setMyData() {
    // console.log('I am here at setMyData. this is what listName looks like: ', listName);
   localStorage.setItem('jsctdData', JSON.stringify(listName));
}