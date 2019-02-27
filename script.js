let taskMain = [],
    listMain = [];


// Global Variables
listCount = 0;

class List {
    constructor(listName) {
        this.listName = listName;
        this.listChosen = false;
    }

    changeListName(listName) {
        this.listName = listName;
    }

    listPicked() {
        this.listChosen = true;
    }

    listUnPicked() {
        this.listChosen = false;
    }
}


class Task {
    constructor(listName, taskName) {
        this.listName = listName;
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


$('.listRow').on('click', function () {
    document.execCommand('selectAll', false, null);
});

function addList(myList, event) {
    switch (event.key) {
        case 'Enter':
            listCount ++;
            $('#theLists').append('<div id="listName' + listCount
                + '"><i id="list-fa-circle' + listCount
                + '" class="fas fa-circle"></i><i id="list-fa-check-circle' + listCount
                + '" class="fas fa-check-circle"></i><span class="listRow" contenteditable="true" onkeyup="addList(this.value, event">'
                + myList + '</span><i id="list-fa-minus-circle' + listCount
                + '" class="fas fa-minus-circle"></i></div>');
            break;


    }
}


$('#list-fa-check-circle0').hide();


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
