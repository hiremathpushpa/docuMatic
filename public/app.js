document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const versionTag = document.getElementById('version-tag');
    const clearAllBtn = document.getElementById('clear-all-btn');

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
            li.dataset.index = index;

            if (todo.isEditing) {
                li.innerHTML = `
                    <input type="text" class="edit-input" value="${todo.text}">
                    <div class="actions">
                        <button class="save-btn">Save</button>
                    </div>
                `;
            } else {
                li.innerHTML = `
                    <span>${todo.text}</span>
                    <div class="actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
            }
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
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;

        const index = parseInt(li.dataset.index, 10);

        if (target.classList.contains('delete-btn')) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        } else if (target.classList.contains('edit-btn')) {
            todos.forEach((todo, i) => {
                todo.isEditing = i === index;
            });
            renderTodos();
            // Focus the new input field
            const editInput = li.querySelector('.edit-input');
            if(editInput) editInput.focus();
        } else if (target.classList.contains('save-btn')) {
            const editInput = li.querySelector('.edit-input');
            if (editInput) {
                todos[index].text = editInput.value;
                todos[index].isEditing = false;
                saveTodos();
                renderTodos();
            }
        }
    });

    clearAllBtn.addEventListener('click', () => {
        todos = [];
        saveTodos();
        renderTodos();
    });

    fetchVersion();
    renderTodos();
}); 