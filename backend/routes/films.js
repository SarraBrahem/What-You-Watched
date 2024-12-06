require('dotenv').config();
const express = require('express');
const router = express.Router();

const {
    discoverMovies,
    getmovie,
    searchMovies
} = require('../controllers/filmsComtroller');

router.get('/', discoverMovies);
router.get('/search', searchMovies);
router.get('/:id', getmovie);

module.exports = router;