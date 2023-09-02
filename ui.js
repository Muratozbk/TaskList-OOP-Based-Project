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
export default UI
