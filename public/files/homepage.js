function disableButton(src) {
    var buttonAdd = document.getElementById("addFavourite");
    console.log(src)

    //Verify the Image src
    if (src != "") {
        buttonAdd.disabled = false;
    } else {
        buttonAdd.disabled = true;
    }
};

function searchButton(){
        var form = document.getElementById('search_form')
        var title = document.getElementById('title').value
        var action_src = "http://localhost:8081/movies/" + title

        form.action = action_src;
}