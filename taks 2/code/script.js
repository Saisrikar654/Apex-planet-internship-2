document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Message validation
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        // If form is valid, submit it (in a real app, you would send to server)
        if (isValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });

    // To-Do List Functionality
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    function addTodoItem() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const span = document.createElement('span');
        span.textContent = todoText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
        
        todoInput.value = '';
    }

    addTodoBtn.addEventListener('click', addTodoItem);
    
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodoItem();
        }
    });

    // Bonus: Make grid items draggable
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        item.setAttribute('draggable', 'true');
        
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.id);
        });
        
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const draggedElement = document.getElementById(id);
            
            if (draggedElement !== this) {
                const temp = document.createElement('div');
                this.parentNode.insertBefore(temp, this);
                this.parentNode.insertBefore(this, draggedElement);
                this.parentNode.insertBefore(draggedElement, temp);
                this.parentNode.removeChild(temp);
            }
        });
    });
});