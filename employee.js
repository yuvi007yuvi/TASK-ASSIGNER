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

// Employee login
$(document).ready(function() {
    $('#employee-login-form').submit(function(e) {
        e.preventDefault();
        var email = $('#employeeEmail').val();
        var password = $('#employeePassword').val();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Redirect to employee dashboard
                window.location.href = 'employee-dashboard.html';
            })
            .catch((error) => {
                alert('Login failed: ' + error.message);
            });
    });
});
