var express = require('express');
var controller = require('../controllers/controller.js')
var router = express.Router();
 
// Route Get movies
router.get('/movies',controller.getMovies);
// Route Get movies title
router.get('/movies/:title',controller.getMoviesTitle);
// Route Add favourite movies
router.get('/movies/favourites/:user_id',controller.getFavouritePosters);

// Route Get all favourite poster
router.post('/movies/favourites',controller.addFavouritesPoster);
// Route Add User
router.post('/user/add',controller.addUser);
 
// export router
module.exports = router;