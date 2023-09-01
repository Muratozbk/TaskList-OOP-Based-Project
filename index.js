// TAsk (id, title, isCompleted)
//ui
//localstorage

import UI from './ui.js'
import Task from './task.js';

const ui = new UI()

document.querySelector('.AddTaskBtn')
    .addEventListener('click', e => {
        const taskTitle = document.querySelector('#newtaskID').value;

        if (taskTitle.length > 0) {
            const task = new Task(taskTitle)

            ui.addToUI(task)
            ui.resetForm();
            console.log(task);
        }
    });

document.querySelector('.task-list').addEventListener('click', (e) => {
    console.log(e.target.className);
    if (e.target.className.includes('task__op_delete')) {
        ui.deleteTask(e)
    }
    if (e.target.className.includes('task-check')) {
        ui.completeTask(e)
    }
})