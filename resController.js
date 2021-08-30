var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   console.log("Got a GET REQUEST for the homepage")
   res.sendFile( __dirname + "/" + "homepage.html" );
})

app.get('/movies/:title', function (req, res) {
   console.log(req.url)
   console.log("Got a GET REQUEST for the SEARCH PATTERN = " + req.params.title)
   res.sendFile( __dirname + "/" + "homepage.html" );
})

app.get('/movies/favourites', function (req, res) {
   console.log("View Favourite List using GET REQUEST")
   res.sendFile( __dirname + "/" + "homepage.html" );
})



app.get('/omdb.html', function (req, res) {
    res.sendFile( __dirname + "/" + "omdb.html" );
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", 'localhost', port)
})