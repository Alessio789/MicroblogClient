var APP = {

    registration : function () {

        var email = document.getElementById("email").innerHTML;
        var username = document.getElementById("username").innerHTML;
        var password = document.getElementById("password").innerHTML

        var jsonBody = JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        });

    },

    init_registration : function () {
        $("#registration").on("click", APP.registration);
    }
}

$(document).ready(function () {
    APP.init_registration();
});