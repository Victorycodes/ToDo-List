// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#task');

// Load all event listeners 
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add Task Event
    form.addEventListener('submit', add);
    // Remove task event
    taskList.addEventListener('click', removeTask);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element 
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class 
        link.className = 'delete-item';
        // Add background-color
        document.getElementsByClassName('collection-item').style.background = 'skyblue';
        // Add icon html
        link.innerHTML = '<i class="fa">x</i>'
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

    });
}

// Add Task
function add(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element 
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class 
    link.className = 'delete-item';
    // Add icon html
    link.innerHTML = '<i class="fa">x</i>'
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove(e.target.parentElement.parentElement);

            // Remove from LS
            removeTaskFromLocalstorage();
        }
    }
}

// Remove from LS
function removeTaskFromLocalstorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // https://jsperf.com/innerhtml-vs-removechild

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}
