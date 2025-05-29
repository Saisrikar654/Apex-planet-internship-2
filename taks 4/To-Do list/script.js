const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filters button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    if (
      currentFilter === 'completed' && !todo.completed ||
      currentFilter === 'active' && todo.completed
    ) return;

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    };

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = todo.text;
    taskInput.className = todo.completed ? 'completed' : '';
    taskInput.readOnly = true;

    taskInput.ondblclick = () => {
      taskInput.readOnly = false;
      taskInput.focus();
    };

    taskInput.onblur = () => {
      taskInput.readOnly = true;
      todo.text = taskInput.value.trim();
      saveTodos();
      renderTodos();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    li.appendChild(checkbox);
    li.appendChild(taskInput);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = '';
  }
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

renderTodos();
