// Import model db
require("dotenv").config()
const randomstring = require("randomstring");
var fs = require('fs');
const auth = require("../middleware/auth");
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const logger = require('pino')();
var db = require('../models/database.js');

// Forbidden Request
exports.getMovies = (req, res) => {
    logger.info('FORBIDDEN REQUEST')
    try {
        res.sendStatus(403);
    } catch (err) {
        console.log(err);
    }
}

// Get Movies Poster
exports.getMoviesTitle = (req,res) => {
    logger.info('[GET REQUEST] Get Movies Poster URL')
    var url = 'http://www.omdbapi.com/?t=' + req.params.title + '&apikey=f34ddbe9'
    axios
        .get(url,{
            todo: ''
        })
        .then(response => {        
            res.send(response.data["Poster"]);
        })
        .catch(error => {
          console.error(error);
          res.end();
        })  
}

// Get Favourites Poster
exports.getFavouritePosters = (req,res) => {
    if (req.params.user_id == 0){
        logger.info("[GET REQUEST] get all users favourite posters URL list");
        db.favourites.findAll({})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.error(err);
            })
    }else{
        logger.info("[GET REQUEST] get user id: %d favourite posters URL list",req.params.user_id);
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
}

// Add Favourites Poster
exports.addFavouritesPoster = async (req,res) => {
    logger.info('[POST REQUEST] add new user favourite poster')
    if(!req.body.user_id){
        res.sendStatus(400);
        return;
    }

    var url = 'http://www.omdbapi.com/?t=' + req.body.title + '&apikey=f34ddbe9'
    await axios
        .get(url,{
            todo: ''
        })
        .then(response => {        
            url = response.data["Poster"];
        })
        .catch(error => {
          console.error(error);
          res.end();
        })  

    const newFavourite = {
        user_id : req.body.user_id,
        title : req.body.title,
        poster_url : url
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
    logger.info('[POST REQUEST] add new user favourite poster')
    bcrypt.hash(req.body.password,10,(error,hash) =>{
        if(!req.body.name || !req.body.password){
            res.sendStatus(400);
            return;
        }
        // fs.writeFileSync('controllers/.env', 'TOKEN_KEY='+randomstring.generate());
        console.log("TOKEN KEY = ",process.env["TOKEN_KEY"])

        const newUser = {
            name : req.body.name,
            password : hash
        };

        const token = jwt.sign(
            {user_id: newUser._id},
            process.env.TOKEN_KEY,
            {expiresIn:"2h"}
        )

        newUser.token = token;
        console.log(newUser);

        db.users.create(newUser)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            })
    })

}