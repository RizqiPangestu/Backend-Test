require("dotenv").config()
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const logger = require('pino')();
var db = require('../models/database.js');
var fs = require("fs");

var UserLoginName = "";

// Homepage
exports.homepage = async (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[GET REQUEST] Entering Homepage : ' + req.session.views + ' views');
    res.render("homepage",{
        name: UserLoginName,
        totalUser: await db.users.count(),
    });
}

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
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[GET REQUEST] Get Movies Poster URL : ' + req.session.views + ' views');
    var url = 'http://www.omdbapi.com/?t=' + req.params.title + '&apikey=f34ddbe9'

    axios
        .get(url,{
            todo: ''
        })
        .then(async response => {
            console.log(response.data["Poster"]);
            res.render("posterpage",{
                title: req.params.title,
                url: response.data["Poster"],
                totalUser: await db.users.count(),
            })
            
            res.end();
        })
        .catch(error => {
          console.error(error);
          res.end();
        })  
}

// Get User's Favourites Poster
exports.getFavouritePosters = (req,res) => {
    if (req.params.user_id == 0){
        req.session.views = (req.session.views || 0) + 1;
        logger.info("[GET REQUEST] get all users favourite posters URL list : ", req.session.views + ' views');
        db.favourites.findAll({})
            .then(data => {
                res.render("favList",{
                    data,
                });
            })
            .catch(err => {
                console.error(err);
            })
    }else{
        req.session.views = (req.session.views || 0) + 1;
        logger.info('[GET REQUEST] get user id: ' + req.params.user_id + ' favourite posters URL list : ' + req.session.views + ' views');;
        db.favourites.findAll({
            where:{
                user_id : req.params.user_id
            }
        })
            .then(data => {
                res.render("favList",{
                    data,
                });
            })
            .catch(err => {
                console.error(err);
            })
    }
}

// Add Favourites Poster
exports.addFavouritesPoster = async (req,res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[POST REQUEST] add new user favourite poster : ' + req.session.views + ' views');
    if(!(req.body.user_id && req.body.title)){
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
    console.log(newFavourite);

    db.favourites.create(newFavourite)
        .then(data => {
            db.users.findAll({
                attributes: ['name'],
                where: {
                    user_id: newFavourite.user_id,
                }
            }).then(user_data =>{
                res.render("handler",{
                    msg: "Movies has been added to "+ user_data[0]['name'] +"'s favourite list",
                })
            })            
        })
        .catch(err => {
            res.sendStatus(500)
        })
}

// Add User
exports.addUser = (req,res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[POST REQUEST] add new user favourite poster : ' + req.session.views + ' views');
    bcrypt.hash(req.body.password,10, async (error,hash) =>{
        if(!req.body.name || !req.body.password){
            res.render("handler",{
                msg: "name and password required",
            })
            return;
        }

        const oldName = await db.users.findOne({where : {name : req.body.name}});

        if(oldName){
            res.render("handler",{
                msg: "name already used",
            })
            return;
        }

        const newUser = {
            name : req.body.name,
            password : hash
        };

        const token = jwt.sign(
            {
                name : newUser.name
            },
            process.env.TOKEN_KEY,
            {expiresIn:"2h"}
        )

        newUser.token = token;
        console.log("TOKEN KEY = ",process.env["TOKEN_KEY"])
        console.log(token);
        console.log(typeof(token));

        db.users.create(newUser)
            .then(data => {
                res.render("handler",{
                    msg: "User "+ newUser.name +" has been added to database",
                })
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(500);
            })
    })

}

// Login Page
exports.loginUserPage = (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[GET REQUEST] Entering Homepage : ' + req.session.views + ' views');
    res.render("loginpage");
}


// Login User
exports.loginUser = async (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[POST REQUEST] Login User : ' + req.session.views + ' views');
    try{
        const {name,password} = req.body;
        if(!(name && password)){
            res.render("handler",{
                msg: "All input is required",
            })
            return;
        }

        const user = await db.users.findOne({where : {name : name}});

        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {user_id: user._id},
                process.env.TOKEN_KEY,
                {expiresIn:"2h"}
            )
            user.token = token;
            UserLoginName = name;
            res.render("homepage",{
                name: UserLoginName,
                totalUser: await db.users.count(),
            })
        }else{
            res.render("handler",{
                msg: "Name or Password not match",
            })
            
            return;
        }

    }catch (err){
        console.log(err);
    }
}

// Users List
exports.listUser = async (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[GET REQUEST] get users list : ' + req.session.views + ' views');;
    db.users.findAll({})
        .then(data => {
            res.render("userpage",{
                data,
            });
        })
        .catch(err => {
            console.error(err);
        })
}

// Login Page
exports.deleteUser = async (req, res) => {
    req.session.views = (req.session.views || 0) + 1;
    logger.info('[DELETE REQUEST] Entering Homepage : ' + req.session.views + ' views');
    const username = "";
    await db.users.findByPk(req.body.user_id).then(data =>{
        username = data.name;
    })

    db.favourites.destroy({
        where: {
            user_id: req.body.user_id
        }
    })

    db.users.destroy({
        where: {
            user_id: req.body.user_id
        }
    }).then(data => {
        res.render("handler",{
            msg: username + " has been removed",
        })
    }).catch(err => {
        console.error(err);
    })
    
}