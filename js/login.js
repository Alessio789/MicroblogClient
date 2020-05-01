var APP = {

    login: function () {

        var username = document.getElementById("inputUsername").value;
        var password = document.getElementById("inputPassword").value;

        localStorage.setItem("username", username);

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

            if (this.status === 200) {

                localStorage.setItem("token", this.getResponseHeader("authorization"))

                location.href = "posts.html";

            } else if (this.status === 401) {

                document.getElementById("error").innerHTML = "Error. The credentials entered are not correct"

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