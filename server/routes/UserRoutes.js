const express = require('express');
const router = express.Router();
const { getLikedMovies, addToMyList, addUserEmail, removeFromMyList } = require('../controllers/UserController')

router.post('/add_user', addUserEmail)
router.get('/liked/:email', getLikedMovies);
router.post('/add', addToMyList);
router.delete('/remove', removeFromMyList);

module.exports = router;