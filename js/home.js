var APP = {

    isAuthenticated: function () {

        if (sessionStorage.getItem("token") != null) {

            document.getElementById("registrationButton").style.display = "none";
            document.getElementById("loginButton").style.display = "none";

            document.getElementById("logoutButton").style.display = "block";
        }
    },

    logout: function () {

        sessionStorage.clear();
        location.reload();
    },

    init_logout: function () {

        $("#logoutButton").on("click", APP.logout);
    }

}

$(document).ready(function () {

    APP.init_logout();
    APP.isAuthenticated();
});