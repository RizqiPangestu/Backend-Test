
function searchButton(){
    var form = document.getElementById('search_form')
    var title = document.getElementById('title').value
    var action = "http://localhost:3000/movies/" + title
    form.action = action;
}

function addFavourites(){
    var form = document.getElementById('addFavourite_form')
    var action = "http://localhost:3000/movies/favourites"
    form.action = action;
}

function searchFavourites(){
    var form = document.getElementById('favourites_form')
    var user_id = document.getElementById('user_id').value
    var action = "http://localhost:3000/movies/favourites/" + user_id
    form.action = action;
}

function addUser(){
    var form = document.getElementById('addUser_form')
    var action = "http://localhost:3000/user/add"
    form.action = action;
}

function delUser(){
    var form = document.getElementById('delUser_form')
    var action = "http://localhost:3000/user/delete"
    form.action = action;
}


function loginUser(){
    var form = document.getElementById('loginUser_form')
    var action = "http://localhost:3000/user/login"
    form.action = action;
}

function delFav(){
    var form = document.getElementById('delFav_form')
    var action = "http://localhost:3000/movies/favourites/delete"
    form.action = action;
}