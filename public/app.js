document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const versionTag = document.getElementById('version-tag');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const fetchVersion = async () => {
        try {
            const response = await fetch('/api/version');
            const data = await response.json();
            versionTag.textContent = `v${data.version}`;
        } catch (error) {
            console.error('Error fetching version:', error);
            versionTag.textContent = 'v1.0.0';
        }
    };

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodoText = todoInput.value.trim();
        if (newTodoText !== '') {
            todos.push({ text: newTodoText, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    fetchVersion();
    renderTodos();
}); 