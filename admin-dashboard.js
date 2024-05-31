// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAbuewBdoMG2G83uzglzQ02Wl124Vs4jBg",
    authDomain: "task-assigner-2c018.firebaseapp.com",
    databaseURL: "https://task-assigner-2c018-default-rtdb.firebaseio.com",
    projectId: "task-assigner-2c018",
    storageBucket: "task-assigner-2c018.appspot.com",
    messagingSenderId: "634081288163",
    appId: "1:634081288163:web:8603e69ea3501e07a54ad6",
    measurementId: "G-PWR5XJ11ZG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Add task to Firebase
function addTask(employeeEmail, date, description) {
    var taskId = database.ref().child('tasks').push().key;
    database.ref('tasks/' + taskId).set({
        employeeEmail: employeeEmail,
        date: date,
        description: description
    });
}

// Delete task from Firebase
function deleteTask(taskId) {
    database.ref('tasks/' + taskId).remove();
}

// Fetch tasks from Firebase
function fetchTasks() {
    database.ref('tasks').on('value', function(snapshot) {
        var tasks = snapshot.val();
        $('#taskTableBody').empty();
        for (var id in tasks) {
            var task = tasks[id];
            $('#taskTableBody').append('<tr id="' + id + '">' +
                '<td>' + task.employeeEmail + '</td>' +
                '<td>' + task.date + '</td>' +
                '<td>' + task.description + '</td>' +
                '<td>' +
                '<button class="btn btn-danger btn-sm delete-btn" data-id="' + id + '">Delete</button>' +
                '</td>' +
                '</tr>');
        }
    });
}

// Document ready
$(document).ready(function() {
    fetchTasks();

    $('#assign-task-form').submit(function(e) {
        e.preventDefault();
        var employeeEmail = $('#employeeEmail').val();
        var date = $('#taskDate').val();
        var description = $('#taskDescription').val();
        addTask(employeeEmail, date, description);
        $('#employeeEmail').val('');
        $('#taskDate').val('');
        $('#taskDescription').val('');
    });

    $('#taskTableBody').on('click', '.delete-btn', function() {
        var taskId = $(this).data('id');
        deleteTask(taskId);
    });
});
