var APP = {
    showPosts: function (address) {

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }


        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                var jsonPosts = JSON.parse(this.responseText);
                var postContainer = document.getElementById("postContainer");

                for (var i = 0; i < jsonPosts.length; i++) {

                    var post = jsonPosts[i];
                    if (i != 0) {
                        var text = postContainer.innerHTML;
                        postContainer.innerHTML = text +
                            "<div class='card'>" +
                            "<h5 class='card-header'>" + post.user.username + "'s post - " + post.dateHour + "</h5>" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title'><b>" + post.title + "</b></h5>" +
                            "<p class='card-text'>" + post.body + "</p>" +
                            "<ul class='list-group list-group-flush' id='" + post.id + "'></ul>" +
                            "<div class='card-body'>" +
                            "<form> <button type='submit' class='btn btn-primary' name='comment'>Comment</button></form>" +
                            "</div>" +
                            "</div>";
                    } else {
                        postContainer.innerHTML =
                            "<div class='card'>" +
                            "<h5 class='card-header'>" + post.user.username + "'s post - " + post.dateHour + "</h5>" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title'><b>" + post.title + "</b></h5>" +
                            "<p class='card-text'>" + post.body + "</p>" +
                            "<ul class='list-group list-group-flush' id='" + post.id + "'></ul>" +
                            "<div class='card-body'>" +
                            "<form> <button type='submit' class='btn btn-primary' name='comment'>Comment</button></form>" +
                            "</div>" +
                            "</div>";
                    }
                    APP.showComments("http://localhost:8080/Microblog/rest/comments", post.id)
                }

            } else {

                document.getElementById("postContainer").innerHTML = "doing..";
            }
        }

        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    },

    showComments: function (address, postId) {

        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                var jsonComments = JSON.parse(this.responseText);
                var commentContainer = document.getElementById(postId);

                for (var i = 0; i < jsonComments.length; i++) {
                    var comment = jsonComments[i];
                    if (comment.post.id == postId) {
                        commentContainer.innerHTML =
                            "<li class='list-group-item'> <p> <b>" + comment.user.username + " - " + comment.dateHour + "</b><br>" + comment.body + "</p> </li>";
                    }
                }

            }
        }

        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    },

    addPost: function () {

        document.getElementById("addPostForm").style.display = "block";
        document.getElementById("addPostButton").style.display = "none";
    },

    savePost: function () {

        var xmlhttp = new XMLHttpRequest();
        var address = "http://localhost:8080/Microblog/rest/posts";
        xmlhttp.open('POST', address, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.withCredentials = false;

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 201) {

                location.reload();
            }


        };

        var data = JSON.stringify({
            "title": document.getElementById("title").value,
            "body": document.getElementById("body").value,
            "user": {
                "username": "Alessio",
                "email": "alessio.trentin3@gmail.com",
                "password": "03da8881bf08561c3e0d3f88bb86920956faa69ed84fe81093b6ef5592cbbc88",
                "salt": "c/vZylHXCG1VardmjmLMhw==",
                "role": "ADMIN"
            }
        });

        xmlhttp.send(data);
    },


    init_addPost: function () {
        $("#addPost").on("click", APP.addPost);
    },

    init_savePost: function () {
        $("#savePost").on("click", APP.savePost);
    }
}

$(document).ready(function () {
    APP.init_addPost();
    APP.init_savePost();
    APP.showPosts("http://localhost:8080/Microblog/rest/posts");
});