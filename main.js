// Commenting out for demonstration purposes (to interact w/ console/etc...)
// (function () {
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
    task = {};
    task.id = id;
    task.title = title;
    task.complete = complete;
    return task;
}

/**
 * Some hardcoded tasks to populate the list!
 */
tasks.push(
    makeTaskObj(1, "Meet Up", false),
    makeTaskObj(2, "Plan our next meetup", false),
    makeTaskObj(3, "Teach some schtuff", true),
    makeTaskObj(4, "Learn some schtuff", false),
    makeTaskObj(5, "Rinse and repeat", true)
);

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
    var task_el = document.getElementById(dom_task_id = 'task_' + id);
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

/**
 Alternate (ugly) way of iterating through an array
 for (var i = 0; i < tasks.length; i++) {
    var task = createDomTaskFromObj(tasks[i]);
    appendTaskElement(task);
}
 */



/**
 * On initial page load, display all tasks (from hardcoded json for now)
 */
tasks.forEach(function (task_obj) {
    var task_el = createDomTaskFromObj(task_obj);
    appendTaskElement(task_el);
});


/**
 * This handles adding/storing/displaying a new task created by the user
 */
var new_task_form = document.forms['new_task_form'];
new_task_form.addEventListener('submit', function (event) {
    event.preventDefault();

    var title = this.elements['new_task[title]'].value;
    createTask(title);

    this.reset();
    this.elements['new_task[title]'].focus();
});

// });

