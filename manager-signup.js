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

// Manager signup
$(document).ready(function() {
    $('#manager-signup-form').submit(function(e) {
        e.preventDefault();
        var email = $('#managerEmail').val();
        var password = $('#managerPassword').val();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                // Add manager role in database
                database.ref('users/' + user.uid).set({
                    email: user.email,
                    role: 'manager'
                });
                alert('Signup successful');
                // Redirect to manager login
                window.location.href = 'admin.html';
            })
            .catch((error) => {
                alert('Signup failed: ' + error.message);
            });
    });
});
