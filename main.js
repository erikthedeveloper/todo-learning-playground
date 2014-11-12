// Commenting out for demonstration purposes (to interact w/ console/etc...)
// (function () {

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

