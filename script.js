$('.listRows').on('click', function () {
    document.execCommand('selectAll', false, null);
});

let taskMain = [];
let listMain = [];

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



task = new Task('My List', 'One');
taskMain.push(task);
console.log(taskMain);
task = new Task('My List', 'Two');
taskMain.push(task);


taskMain[0].changeTaskName('1');
taskMain[1].completeTask();
taskMain[1].unCompleteTask();
taskMain[0].changeTaskName('One');
console.log(taskMain);
