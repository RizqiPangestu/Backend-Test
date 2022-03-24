var express = require('express');
var controller = require('../controllers/controller.js')
var router = express.Router();
const auth = require("../middleware/auth");
 
//====GET====//
// Route Homepage
router.get('/',(auth,controller.homepage))
// Route Get movies
router.get('/movies',(auth,controller.getMovies));
// Route Get movies title
router.get('/movies/:title',(auth,controller.getMoviesTitle));
// Route Get favourite movies List
router.get('/movies/favourites/:user_id',(auth,controller.getFavouritePosters));
// Route Get Users List
router.get('/user/list',(auth,controller.listUser));
// Route Login User
router.get('/user/login',(auth,controller.loginUserPage));

//====POST====//
// Route Add favourite poster
router.post('/movies/favourites',(auth,controller.addFavouritesPoster));
// Route Add User
router.post('/user/add',(auth,controller.addUser));
// Route Login User
router.post('/user/login',(auth,controller.loginUser));

//====DELETE====//
// Route Delete User 
router.post('/user/delete',(auth,controller.deleteUser));
// Route Delete User's Favourite 
router.post('/movies/favourites/delete',(auth,controller.deleteFavourite));

// export router
module.exports = router;