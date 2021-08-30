// Import model db
const axios = require('axios');
var bcrypt = require('bcrypt');
var db = require('../models/database.js');

// Forbidden Request
exports.getMovies = (req, res) => {
    console.log(req.url)
    try {
        console.log("FORBIDDEN REQUEST")
        res.sendStatus(403);
    } catch (err) {
        console.log(err);
    }
}

// Get Movies Poster
exports.getMoviesTitle = (req,res) => {
    console.log(req.url);
    console.log(req.params)
    var url = 'http://www.omdbapi.com/?t=' + req.params.title + '&apikey=f34ddbe9'
    axios
        .get(url,{
            todo: ''
        })
        .then(response => {
            console.log(url);
            console.log(`statusCode: ${response.status}`);
            console.log(`statusText: ${response.statusText}`);
            var data = response.data;
            console.log(data);
            console.log(data["Title"]);
            console.log(data["Poster"]);            
            res.send(response.data["Poster"]);
        })
        .catch(error => {
          console.error(error)
          data = JSON.stringify(error.response.data)
          res.send(data);
          res.end("Error");
        })
    
}

// Get Favourites Poster
exports.getFavouritePosters = (req,res) => {
    console.log(req.url)
    db.favourites.findAll({
        where:{
            user_id : req.params.user_id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error(err);
        })
}

// Add Favourites Poster
exports.addFavouritesPoster = (req,res) => {
    console.log(req.url)
    if(!req.body.user_id){
        console.log("BAD REQUEST");
        res.sendStatus(400);
        return;
    }

    const newFavourite = {
        user_id : req.body.user_id,
        title : req.body.title
    };

    db.favourites.create(newFavourite)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.sendStatus(500)
        })
}

// Add User
exports.addUser = (req,res) => {
    console.log("ADD USER")
    console.log(req.body)
    bcrypt.hash(req.body.password,10,(error,hash) =>{
        if(!req.body.name || !req.body.password){
            console.log("BAD REQUEST")
            console.log(res.req.body)
            res.sendStatus(400);
            return;
        }
    
        const newUser = {
            name : req.body.name,
            password : hash
        };
    
        db.users.create(newUser)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.sendStatus(500);
            })
    })
}