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
                    commentContainer.innerHTML =
                        "<li class='list-group-item'> <p> <b>" + comment.user.username + " - " + comment.dateHour + "</b>" + comment.body + "</p> </li>";
                    }

            } else {

                document.getElementById(postId).innerHTML = "doing..";
            }
        }

        xmlhttp.open("GET", address, true);
        xmlhttp.send();
    }
}

$(document).ready(function () {
    APP.showPosts("http://localhost:8080/Microblog/rest/posts");
});