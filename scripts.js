document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Crear el mensaje de felicitación y colocarlo dentro del contenedor de tareas
    const completionMessage = document.createElement('div');
    completionMessage.id = 'completion-message';
    completionMessage.style.display = 'none'; // Oculto por defecto
    taskList.parentNode.appendChild(completionMessage); // Lo añadimos al final del contenedor de tareas

    // Crear el mensaje motivacional para el café
    const coffeeMessage = document.createElement('div');
    coffeeMessage.id = 'coffee-message';
    coffeeMessage.style.display = 'none'; // Oculto por defecto
    taskList.parentNode.appendChild(coffeeMessage); // Añadimos el mensaje de café al contenedor

    let completedCount = 0; // Contador de tareas completadas

    // Función para agregar una nueva tarea
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');

            const checkBtn = document.createElement('button');
            checkBtn.innerHTML = '✔';
            checkBtn.classList.add('check-btn');

            // Marcar tarea como completada
            checkBtn.addEventListener('click', () => {
                taskContent.classList.toggle('completed');

                // Incrementar el contador de completadas
                if (taskContent.classList.contains('completed')) {
                    completedCount++;
                } else {
                    completedCount--;
                }

                updateMessages();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '✖';
            deleteBtn.classList.add('delete-btn');

            // Eliminar tarea
            deleteBtn.addEventListener('click', () => {
                // Reducir el contador si se elimina una tarea completada
                if (taskContent.classList.contains('completed')) {
                    completedCount--;
                }
                taskItem.remove();
                updateMessages();
            });

            buttonsContainer.appendChild(checkBtn);
            buttonsContainer.appendChild(deleteBtn);
            taskItem.appendChild(taskContent);
            taskItem.appendChild(buttonsContainer);
            taskList.appendChild(taskItem);

            taskInput.value = '';
            hideCompletionMessage(); // Ocultar mensaje de felicitaciones al agregar una nueva tarea
            hideCoffeeMessage(); // Ocultar mensaje de café al agregar una nueva tarea
        }
    });

    // Función para actualizar los mensajes según las tareas completadas
    function updateMessages() {
        const allTasks = document.querySelectorAll('.task-item');
        const totalTasks = allTasks.length;

        // Mostrar mensaje de felicitaciones si todas las tareas están completadas
        if (totalTasks > 0 && completedCount === totalTasks) {
            showCompletionMessage();
            hideCoffeeMessage(); // Asegurarse de que el mensaje de café esté oculto
        } else {
            hideCompletionMessage();

            // Mostrar mensaje de café si se completaron exactamente dos tareas
            if (completedCount % 2 === 0 && completedCount > 0 && totalTasks - completedCount > 0) {
                showCoffeeMessage();
            } else {
                hideCoffeeMessage();
            }
        }
    }

    // Mostrar el mensaje de felicitación con imagen a la izquierda
    function showCompletionMessage() {
        completionMessage.innerHTML = `
            <div class="completion-container">
                <img src="assets/foxy.png" alt="Felicitaciones" class="completion-image">
                <span class="completion-text">Mereces un descanso, completaste todas tus tareas :)</span>
            </div>`;
        completionMessage.style.display = 'flex';
    }

    // Ocultar el mensaje de felicitación
    function hideCompletionMessage() {
        completionMessage.style.display = 'none';
    }

    // Mostrar el mensaje de "Tomar un café"
    function showCoffeeMessage() {
        coffeeMessage.innerHTML = `
            <div class="coffee-container">
                <img src="assets/coffee.png" alt="Momento de café" class="coffee-image">
                <span class="coffee-text">Es un buen momento para un cafe :)</span>
            </div>`;
        coffeeMessage.style.display = 'flex';
    }

    // Ocultar el mensaje de "Tomar un café"
    function hideCoffeeMessage() {
        coffeeMessage.style.display = 'none';
    }
});
