require("dotenv").config();
const express = require("express");
const cookieSession = require('cookie-session')
const routes = require('./routes/routes.js');
const fs = require('fs');
const os = require("os");

function setEnvValue(key, value) {

  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

  // find the env we want based on the key
  const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
      return line.match(new RegExp(key));
  }));

  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`);

  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));
}

setEnvValue("HOME_DIR",__dirname);

const app = express();

const connection = require('./config/connection.js');
connection.sync({ force: false }).then(() => {
   console.log("Drop and re-sync db.");
 });


// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session_id',
  keys: ['key1', 'key2']
}))

app.use(express.static('public'))

app.use(routes);

app.set('view engine', 'ejs');

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log("Example app listening at http://%s:%s", 'localhost', PORT);
});
