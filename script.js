document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    `;
    
    taskList.appendChild(li);
    saveTasks();
    
    taskInput.value = "";
}

// Mark task as completed
function toggleComplete(task) {
    task.classList.toggle("completed");
    saveTasks();
}

// Delete task
function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span onclick="toggleComplete(this)" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}

