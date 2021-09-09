const express = require("express");
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))


app.get("/", (req, res) => {
//   res.send("<h1>Welcome to EJS world!</h1>");
res.render("index");
});

app.get("/coba", (req,res) => {
    console.log(req.body);
    res.render("successAdd",{
        nama: "Rizqi Pangestu",
    });
})

app.post("/login", (req, res) => {
    const { name, password } = req.body;
  
    if (name === "admin" && password === "admin") {
      res.render("success", {
        username: name,
      });
    } else {
      res.render("failure");
    }
});

app.get("/repos", async (req, res) => {
    const username = req.query.username || "myogeshchavan97";
    console.log(username);
    try {
      const result = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = result.data.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
      }));
      res.render("repos", {
        repos
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Error while getting list of repositories");
    }
  });

app.set('view engine', 'ejs');


// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
   console.log("Example app listening at http://%s:%s", 'localhost', PORT);
});