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
                    var text = postContainer.innerHTML;

                    if (text == undefined || text == "loading...") {

                        text = "";
                    }

                    postContainer.innerHTML = text +
                        "<div class='card'>" +
                        "<h5 class='card-header'>" + post.user.username + "'s post - " + post.dateHour + "</h5>" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title'><b>" + post.title + "</b></h5>" +
                        "<p class='card-text'>" + post.body + "</p>" +
                        "</div>" +
                        "<ul class='list-group list-group-flush' id='ul" + post.id + "'></ul>" +
                        "<div class='card-body'>" +
                        "<textarea name=\"body\" id='textarea" + post.id + "' rows=\"2\" cols=\"40\"></textarea> <br>" +
                        "<p class='error' id='errorComment" + post.id + "'>Error. You don't have permission to perform this operation</p>" +
                        "<button type='submit' class='btn btn-primary' id='" + post.id + "' name='comment'>Comment</button>" +
                        "</div>" +
                        "</div>";


                    APP.showComments("https://localhost:8443/Microblog/rest/v1/comments", post.id)
                }

                for (var i = 0; i <jsonPosts.length; i++) {
                    var post = jsonPosts[i];
                    $("#" + post.id).on("click", APP.findPostById);
                }
            } else {

                document.getElementById("postContainer").innerHTML = "loading...";
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
                var commentContainer = document.getElementById("ul" + postId);


                for (var i = 0; i < jsonComments.length; i++) {

                    var comment = jsonComments[i];

                    if (comment.post.id == postId) {

                        var text = commentContainer.innerHTML;

                        commentContainer.innerHTML = text +
                            "<li class='list-group-item'> <p> <b>" + comment.user.username + " - " + comment.dateHour + "</b><br>" + comment.body + "</p> </li>"
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

        if (window.XMLHttpRequest) {

            xmlhttp = new XMLHttpRequest();

        } else {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var address = "https://localhost:8443/Microblog/rest/v1/posts";

        xmlhttp.open('POST', address, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("Authorization", sessionStorage.getItem("token"));
        xmlhttp.withCredentials = false;

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 201) {

                location.reload();

            } else if (this.status === 403) {

                document.getElementById("addPostForm").style.display = "none";

                document.getElementById("errorPost").style.display = "block";
                document.getElementById("addPostButton").style.display = "block";

            } else {

                document.getElementById("addPostForm").innerHTML = "loading...";
            }


        };

        var data = JSON.stringify({
            "title": document.getElementById("title").value,
            "body": document.getElementById("body").value,
            "user": {
                "username": sessionStorage.getItem("username")
            }
        });

        xmlhttp.send(data);
    },



    saveComment: function (post) {

        if (window.XMLHttpRequest) {

            xmlhttp = new XMLHttpRequest();

        } else {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var address = "https://localhost:8443/Microblog/rest/v1/comments";


        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 201) {

                location.reload();

            } else if (this.status === 403) {

                document.getElementById("textarea" + post.id).style.display = "none";
                document.getElementById("errorComment" + post.id).style.display = "block";

            }

        };

        var data = JSON.stringify({
            "body": document.getElementById("textarea" + post.id).value,
            "post": {
                "id": post.id,
                "dateHour": post.dateHour,
                "title": post.title,
                "body": post.body,
                "user": {
                    "username": post.user.username,
                    "email": post.user.email,
                    "password": post.user.password,
                    "salt": post.user.salt,
                    "role": post.user.role
                }
            },
            "user": {
                "username": sessionStorage.getItem("username")
            }
        });

        xmlhttp.open('POST', address, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("Authorization", sessionStorage.getItem("token"));
        xmlhttp.send(data);
    },


    findPostById: function (event) {
        var postId = event.target.id;
        var address = "https://localhost:8443/Microblog/rest/v1/posts/" + postId;

        if (window.XMLHttpRequest) {

            xhFindPost = new XMLHttpRequest();

        } else {

            xhFindPost = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhFindPost.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 200) {

                var post = JSON.parse(this.responseText);
                APP.saveComment(post);

            } else {
                document.getElementById("textarea" + postId).innerText = "Error. Try again.";
            }

        }
        xhFindPost.open("GET", address, true);
        xhFindPost.send();
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
    APP.showPosts("https://localhost:8443/Microblog/rest/v1/posts");

});