
$(document).ready(() => {
    $.getJSON('/api/todos')
    .then(addTodos)
    .catch((err) => {
        console.log(err);
    })

    $('#todoInput').keypress((event) => {
        if (event.which == 13) { // keycode 13 is the enter key
            createTodo();
        }
    })

    $('.list').on('click', 'li', function() { // can't use arrow function for this one. context of 'this' changes
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(e) { // can't use arrow function for this one. context of 'this' changes
        e.stopPropagation(); // this prevents event bubbling so update doesn't occur when the user clicks 'X' (clicking span should not trigger li!)
        removeTodo($(this).parent());
    })
});

function addTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    const newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id)
    newTodo.data('completed', todo.completed)
    // newTodo.data('created_date', todo.created_date) // FIXME: Add date? Will that overcomplicate things? Omit, for now.
    
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    const userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then((newTodo) => {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch((err) => {
        console.log(err);
    })
}

function removeTodo(todo) {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(() => {
        todo.remove();
    })
    .catch((err) => {
        console.log(err);
    })
}

function updateTodo(todo) {
    let updateUrl = '/api/todos/' + todo.data('id');
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone}; // Flip from true to false and vice/versa
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then((updatedTodo) => {
        // console.log(updatedTodo);
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    .catch((err) => {
        console.log(err);
    })
}

