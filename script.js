let listName = [],
    taskName = [];

// Global Variables
listCount = 0;

class List {
    constructor(listName) {
        this.name = listName;
        this.chosen = false;
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
    constructor(listName, taskName) {
        this.name = listName;
        this.taskName = taskName;
        this.taskComplete = false;
    }

    changeTaskName(taskName) {
        this.taskName = taskName;
    }

    completeTask() {
        this.taskComplete = true;
    }

    unCompleteTask() {
        this.taskComplete = false;
    }
}

// This is where input come into the program


// $('#listNewName').on('click', function () {
//     document.execCommand('selectAll', false, null);
// });

function addList(list, event) {
    switch (event.key) {
        case 'Enter':
            list = list.toString();
            let simpleTest = listName.filter(function(listName) {
                return listName.name === list;
            });
            if (list === '' || simpleTest.length > 0) {
                simpleTest = [];
                alert ('You entered the same list name as before or you entered a blank list name');
            } else {
                listName[listCount] = new List(list);
                listCount++;
                reWriteList(listName);
            }
            $('#listNewName').val('');
            break;
    }
}

function reWriteList(listName) {
    $(`.listFlex`).remove();
    for (let i = 0; i < listName.length; i++) {
        $(`#listName${i}`).remove();
    }
    for (let i = 0; i < listName.length; i++) {
        $(`#theLists`).append(`<div id="listName${i}" class="listFlex"><i id="circleHole${i}" onclick="lcheckMe(${i})" class="far fa-circle"></i><i id="circleCheck${i}" onclick="lunCheckMe(${i})" class="fas fa-check-circle"></i><span>${listName[i].name}</span><i id="deleteMe" onclick="ldeleteMe(${i})" class="fas fa-minus-circle"></i>
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
}

function lunCheckMe(item) {
    $(`#circleCheck${item}`).hide();
    $(`#circleHole${item}`).show();
    listName[item].listUnPicked();
}

function ldeleteMe(item) {
    listCount --;
    listName.splice(item, 1);
    reWriteList(listName);
}




// task = new Task('My List', 'One');
// taskMain.push(task);
// console.log(taskMain);
// task = new Task('My List', 'Two');
// taskMain.push(task);


// taskMain[0].changeTaskName('1');
// taskMain[1].completeTask();
// taskMain[1].unCompleteTask();
// taskMain[0].changeTaskName('One');
// console.log(taskMain);
