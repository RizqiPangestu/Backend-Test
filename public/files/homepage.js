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
        var action = "http://localhost:3000/movies/" + title
        form.action = action;
}

function changePoster(){
    b = document.getElementById('poster')
    b.src = 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
    console.log(b)
}