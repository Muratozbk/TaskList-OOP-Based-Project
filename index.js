// TAsk (id, title, isCompleted)
//ui
//localstorage

import UI from './ui.js'
import Task from './task.js';

const ui = new UI()

document.querySelector('.AddTaskBtn').addEventListener('click', e => {
    const taskTitle = document.querySelector('#newtaskID').value;

    const task = new Task(taskTitle)

    ui.addToUI(task)
    ui.resetForm();
    console.log(task);
})