function makeTask(id, title, complete) {
    task = {};
    task.id = id;
    task.title = title;
    task.complete = complete;
    return task;
}

var tasks = [
    makeTask(1, "Meet Up", false),
    makeTask(2, "Plan our next meetup", false),
    makeTask(3, "Teach some schtuff", true),
    makeTask(4, "Learn some schtuff", false),
    makeTask(5, "Rinse and repeat", true)
];

function createDomTask(task_object) {
    var dom_task_id = 'task_ ' + task_object.id;

    var task_el = document.createElement('div');
    var input_el = document.createElement('input');
    var label_el = document.createElement('label');
    task_el.setAttribute('class', 'task-item');

    input_el.setAttribute('type', 'checkbox');
    input_el.setAttribute('name', 'todo[]');
    input_el.setAttribute('id', dom_task_id);
    input_el.checked = task_object.complete;

    label_el.setAttribute('for', dom_task_id);
    label_el.innerHTML = task_object.title;

    task_el.appendChild(input_el);
    task_el.appendChild(label_el);

    return task_el;
}

function appendTask(task_el) {
    var tasks_container = document.getElementsByClassName('tasks-container')[0];
    tasks_container.appendChild(task_el);
}

for (var i = 0; i < tasks.length; i++) {
    var task = createDomTask(tasks[i]);
    appendTask(task);
}


