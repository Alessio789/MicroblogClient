var APP = {

    login: function () {

        var username = document.getElementById("inputUsername").value;
        var password = document.getElementById("inputPassword").value;

        var jsonBody = JSON.stringify({
            "username": username,
            "password": password
        });

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                localStorage.setItem("token", this.getResponseHeader("authorization"))

                location.href = "posts.html";

            } else {

                document.getElementById("error").innerHTML = "Error. Try Again"

            }
        }

        xmlhttp.open("POST", "https://localhost:8443/Microblog/rest/login", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(jsonBody);
    },

    init_login : function () {
        $("#login").on("click", APP.login);
    }
}

$(document).ready(function () {
    APP.init_login();
});