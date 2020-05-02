var APP = {

    registration: function () {

        var email = document.getElementById("email").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        var jsonBody = JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        });

        APP.addUser(jsonBody);

    },

    addUser: function (user) {

        if (window.XMLHttpRequest) {

            xmlhttp = new XMLHttpRequest();

        } else {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 201) {

                location.href = "../index.html";
            }
        }

        xmlhttp.open("POST", "https://localhost:8443/Microblog/rest/users", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(user);
    },

    init_registration: function () {
        $("#registration").on("click", APP.registration);
    }
}

$(document).ready(function () {
    APP.init_registration();
});