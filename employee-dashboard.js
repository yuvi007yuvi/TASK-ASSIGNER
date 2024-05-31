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

// Fetch tasks for the current employee
function fetchTasks() {
    var user = firebase.auth().currentUser;
    if (user) {
        var userEmail = user.email;
        database.ref('tasks').orderByChild('employeeEmail').equalTo(userEmail).on('value', function(snapshot) {
            var tasks = snapshot.val();
            $('#taskTableBody').empty();
            for (var id in tasks) {
                var task = tasks[id];
                $('#taskTableBody').append('<tr>' +
                    '<td>' + task.date + '</td>' +
                    '<td>' + task.description + '</td>' +
                    '</tr>');
            }
        });
    }
}

// Handle dark mode toggle
function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
    $('.navbar').toggleClass('dark-mode');
}

// Display username
function displayUsername() {
    var user = firebase.auth().currentUser;
    if (user) {
        $('#username-display').text(user.email);
    }
}

// Handle logout
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = 'employee.html';
    });
}

// Document ready
$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            displayUsername();
            fetchTasks();
        } else {
            window.location.href = 'employee.html';
        }
    });

    $('#toggle-dark-mode').click(function() {
        toggleDarkMode();
    });

    $('#logout').click(function() {
        logout();
    });
});
