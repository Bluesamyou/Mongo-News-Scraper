$(document).ready(function () {
    $.ajax({
        method: "GET",
        url: "/api/loadArticles"
    }).then(function (data) {
        data.forEach(function (article) {
            var appendItem = $(
                `<div class="card" style="width: 18rem; display: inline-flex; margin: 10px;text-align: center;">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.body}</p>
                        <button class="btn btn-success save-button" data-id="${article._id}">Save Card</button>
                    </div>
                </div>`)

            $(".card-container").append(appendItem)
        });
    })

    $(".refresh-button").on("click", function (e) {
        e.preventDefault();

        $.ajax({
            method: "GET",
            url: "/api/fetchArticles",
        }).then(function (body) {
            location.reload()
        })
    })

    $(".delete-button").on("click", function (e) {
        e.preventDefault();



        $.ajax({
            method: "DELETE",
            url: "/api/deleteArticles"
        }).then(function () {
            location.reload()
        })
    })
})