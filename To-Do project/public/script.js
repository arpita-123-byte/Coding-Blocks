document.addEventListener("DOMContentLoaded", fetchTodos);

function fetchTodos() {
  fetch('/api/todos')
    .then(res => res.json())
    .then(showTodos)
    .catch(err => console.error('Fetch error:', err));
}

function addTask() {
  const taskInput = document.getElementById('newTask');
  const task = taskInput.value.trim();
  if (!task) return alert('Please enter a task.');
  fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  })
  .then(res => res.json())
  .then(() => {
    taskInput.value = '';
    fetchTodos();
  });
}

function deleteTask(id) {
  fetch(`/api/todos/${id}`, { method: 'DELETE' })
    .then(() => fetchTodos());
}

function changePriority(id, direction) {
  fetch(`/api/todos/${id}/${direction}`, { method: 'POST' })
    .then(() => fetchTodos());
}

function showTodos(todos) {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  todos.sort((a, b) => b.priority - a.priority);
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task-text';
    taskSpan.innerText = `${todo.task} (Priority: ${todo.priority})`;

    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    const delBtn = document.createElement('button');
    delBtn.innerText = '🗑️';
    delBtn.onclick = () => deleteTask(todo.id);

    const upBtn = document.createElement('button');
    upBtn.innerText = '⬆️';
    upBtn.onclick = () => changePriority(todo.id, 'increase');

    const downBtn = document.createElement('button');
    downBtn.innerText = '⬇️';
    downBtn.disabled = todo.priority === 0;
    downBtn.onclick = () => changePriority(todo.id, 'decrease');

    btnContainer.append(upBtn, downBtn, delBtn);
    li.append(taskSpan, btnContainer);
    list.appendChild(li);
  });
}

