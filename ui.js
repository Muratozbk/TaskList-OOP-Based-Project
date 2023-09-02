import LS from './ls.js'

function UI() { }
const ls = new LS();

UI.prototype.showAllTasks = function () {
  let tasks = ls.fetchTask();
  let newHtml = '';
  tasks.forEach((task) => {
    newHtml += `
    <div class="task  ${task.isComplete ? 'completed' : ''} " data-createdate="${task.id}">
    <div class="task__details">
      <input type="checkbox" class="task-check" ${task.isComplete ? 'checked' : ''} />
      <label class="task-title">${task.title}</label>
    </div>

    <div class="task__op">
      <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
      <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
    </div>
  </div>
    `;
  });

  document.querySelector('.task-list').innerHTML = newHtml;
}

UI.prototype.addToUI = function (task) {
  ls.storeTask(task);

  let newHtml = `
<div class="task-list">
<div class="task" data-createdate="${task.id}">
  <div class="task__details">
    <input type="checkbox" class="task-check" />
    <label class="task-title">${task.title}</label>
  </div>

  <div class="task__op">
    <ion-icon class="task__op_edit" name="create-outline"></ion-icon>
    <ion-icon class="task__op_delete" name="trash-outline"></ion-icon>
  </div>
</div>
</div>
`;
  document.querySelector('.task-list')
    .insertAdjacentHTML('afterbegin', newHtml)
};
UI.prototype.resetForm = function () {
  document.getElementById('newtaskID').value = '';
}


UI.prototype.deleteTask = function (e) {
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdate;
  ls.deleteTask(id);
  task.remove();
}

UI.prototype.completeTask = function (e) {
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdate;
  ls.completeTask(id);
  task.classList.toggle('completed')
}

UI.prototype.editTask = function (e) {
  const task = e.target.parentElement.parentElement;
  const id = task.dataset.createdate;
  const data = ls.findTask(id);

  document.querySelector('#newtaskID').value = data.title;
  document.querySelector('#updateTaskId').value = data.id;

  document.querySelector('.AddTaskBtn').style.display = 'none';
  document.querySelector('.EditTaskBtn').style.display = 'inline';
  document.querySelector('.CancelTaskBtn').style.display = 'inline';

};

UI.prototype.updateTask = function (e) {
  const taskId = document.querySelector('#updateTaskId').value;
  const taskTitle = document.querySelector('#newtaskID').value;
  const tasks = document.querySelectorAll('.task-title')
  if (taskTitle.length > 0) {
    tasks.forEach((title) => {
      if (title.parentElement.parentElement.dataset.createdate === taskId) {
        title.innerText = taskTitle;
      }
    });
  };
  document.querySelector('#newtaskID').value = '';
  document.querySelector('#updateTaskId').value = '';

  document.querySelector('.AddTaskBtn').style.display = 'inline';
  document.querySelector('.EditTaskBtn').style.display = 'none';
  document.querySelector('.CancelTaskBtn').style.display = 'none';
}

export default UI
