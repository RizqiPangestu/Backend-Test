require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");
const logger = require('pino')();
const routes = require('./routes/routes.js');
const auth = require("./middleware/auth");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const connection = require('./config/connection.js');
connection.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
 });

app.use(cors(corsOptions));

// parse requests of content-type - application/json
// create application/json parser
// var jsonParser = bodyParser.json()
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

app.use(routes);

// simple route
app.get("/",(req, res) => {
  logger.info('[GET REQUEST] Entering Homepage')
  res.sendFile(__dirname + '/homepage.html');
});
// set port, listen for requests
const PORT = process.env.PORT;
console.log(PORT)
app.listen(PORT, () => {
   console.log("Example app listening at http://%s:%s", 'localhost', PORT);
});
