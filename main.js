const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
var routes = require('./routes/routes.js')

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const connection = require('./config/connection.js');
connection.sync({ force: false }).then(() => {
   console.log("Drop and re-sync db.");
 });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
// create application/json parser
// var jsonParser = bodyParser.json()
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))


// simple route
app.get("/", (req, res) => {
  console.log(req.url);
  res.sendFile(__dirname + '/homepage.html');
});

app.use(routes);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log("Example app listening at http://%s:%s", 'localhost', PORT);
});
