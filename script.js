let listName = [],
    taskName = [];

// Global Variables
listCount = 0;

// $(`#taskNewName`).hide();

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
    constructor(listName, taskName) {
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

// This part of the program handles lists


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
                listName[listCount] = new List(list);
                listCount++;
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

function lcheckMe(item) {
    $(`#circleHole${item}`).hide();
    $(`#circleCheck${item}`).show();
    listName[item].listPicked();
    $(`#listNewName`).hide();
    $(`#theLists`).hide();
    for (i = 0; i < listName.length; i++) {
        if (listName[i].chosen) {
            $(`h3`).html(`<h3><i id="circleCheck${i}" onclick="lunCheckMe(${i})" class="fas fa-check-circle"></i>${listName[i].name} Tasks`);
        }
    }
}

function lunCheckMe(item) {
    $(`#circleCheck${item}`).hide();
    $(`#circleHole${item}`).show();
    listName[item].listUnPicked();
    $(`#listNewName`).show();
    $(`#theLists`).show();
    reWriteList(listName);
    $(`h3`).html(`<h3>Tasks</h3>`);
}

function ldeleteMe(item) {
    listCount--;
    listName.splice(item, 1);
    reWriteList(listName);
}

$('.listChangeable').on('click', function () {
    document.execCommand('selectAll', false, null);
});


// This part of the program handles tasks


function addTask(value, event) {}