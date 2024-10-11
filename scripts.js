const todos = []; // Lista de tareas
let completedTasks = 0; // Contador de tareas completadas

const render = () => {
    const todoList = document.getElementById("task-list");
    todoList.innerHTML = ""; // Limpiamos la lista de tareas

    todos.forEach((todo, i) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("task-item"); // Usamos la clase del CSS

        // Texto de la tarea
        const taskText = document.createElement("span");
        taskText.textContent = todo.text;
        if (todo.completed) {
            taskText.classList.add("completed"); // Añadimos clase para tareas completadas
        }

        // Botón de check (marcar como completada)
        const checkBtn = document.createElement("button");
        checkBtn.textContent = "✔";
        checkBtn.classList.add("check-btn");
        checkBtn.addEventListener("click", () => {
            todo.completed = !todo.completed; // Alternamos el estado de completada
            todo.completed ? completedTasks++ : completedTasks--;
            render();
        });

        // Botón de eliminar
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            if (todo.completed) {
                completedTasks--; // Si eliminamos una tarea completada, restamos el contador
            }
            todos.splice(i, 1);
            render();
        });

        // Agregamos los botones y el texto a la tarea
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");
        buttonsContainer.appendChild(checkBtn);
        buttonsContainer.appendChild(deleteBtn);

        todoItem.appendChild(taskText);
        todoItem.appendChild(buttonsContainer);
        todoList.appendChild(todoItem);
    });

    // Verificamos las condiciones para mostrar mensajes
    updateMessages();
};

// Función para manejar los mensajes de felicitaciones y café
const updateMessages = () => {
    const totalTasks = todos.length;
    const completionMessage = document.getElementById("completion-message");
    const coffeeMessage = document.getElementById("coffee-message");

    // Ocultamos los mensajes inicialmente
    completionMessage.style.display = "none";
    coffeeMessage.style.display = "none";

    // Condiciones para mostrar mensajes
    if (completedTasks === totalTasks && totalTasks > 0) {
        completionMessage.style.display = "flex"; // Mostrar felicitaciones si todas las tareas están completadas
    } else if (completedTasks % 2 === 0 && completedTasks > 0 && completedTasks < totalTasks) {
        coffeeMessage.style.display = "flex"; // Mostrar mensaje de café cuando se cumplan 2 tareas
    }
};

window.onload = () => {
    const form = document.getElementById("todo-form");

    form.onsubmit = (e) => {
        e.preventDefault();
        const todoInput = document.getElementById("new-task");
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            todos.push({ text: todoText, completed: false }); // Añadimos la tarea con su estado de completada en falso
            todoInput.value = ""; // Limpiamos el campo de texto
            completedTasks = 0; // Reiniciamos el contador al agregar una nueva tarea
            render(); // Volvemos a renderizar la lista de tareas
        }
    };
};
