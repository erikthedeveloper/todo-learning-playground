var tasks = [];

/**
 * Create a javascript object to represent a task. This defines/enforces our Task structure
 *
 * @param id
 * @param title
 * @param complete
 * @returns {{}|*}
 */
function makeTaskObj(id, title, complete) {
    var task = {};
    task.id = id;
    task.title = title;
    task.complete = complete;
    return task;
}

/**
 * Create and Persist a new Task (in simple array for now)
 *
 * @param title
 * @returns {{}|*}
 */
function createTask(title) {
    var new_task_obj = makeTaskObj(tasks.length + 1, title, false);
    tasks.push(new_task_obj);

    var new_task_el = createDomTaskFromObj(new_task_obj);
    appendTaskElement(new_task_el);

    return new_task_obj;
}

/**
 * Destroy a Task. Yay!
 * @param id
 */
function destroyTask(id) {
    var task_el = document.getElementById('task_' + id);
    if (task_el) {
        tasks = tasks.filter(function (task_obj) {
            return task_obj.id != id;
        });
        task_el.remove();
    }
}

/**
 * Construct the DOM element representation of a task from its json form
 *
 * @param task_object
 * @returns {HTMLElement}
 */
function createDomTaskFromObj(task_object) {
    var dom_task_id = 'task_' + task_object.id;

    var task_el = document.createElement('div');
    task_el.setAttribute('class', 'task-item');
    task_el.setAttribute('id', dom_task_id);

    var checkbox_el = document.createElement('input');
    checkbox_el.setAttribute('type', 'checkbox');
    checkbox_el.setAttribute('name', 'todos[' + task_object.id + ']');
    checkbox_el.checked = task_object.complete;

    var label_el = document.createElement('label');
    label_el.setAttribute('for', dom_task_id);
    label_el.innerHTML = task_object.title;

    var remove_button = document.createElement('a');
    remove_button.setAttribute('class', 'task-remove-button right');
    remove_button.setAttribute('data-target-id', dom_task_id);
    remove_button.href = '#';
    remove_button.innerHTML = 'delete';
    remove_button.addEventListener('click', function (event) {
        event.preventDefault();
        destroyTask(task_object.id);
    });

    task_el.appendChild(checkbox_el);
    task_el.appendChild(label_el);
    task_el.appendChild(remove_button);

    return task_el;
}

/**
 * Append a task DOM element to the tasks-container DOM element
 *
 * @param task_el
 */
function appendTaskElement(task_el) {
    var tasks_container = document.getElementsByClassName('tasks-container')[0];
    tasks_container.appendChild(task_el);
}
