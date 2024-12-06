const express = require('express');
const router = express.Router();

const {
    searchSeries,
    discoverSeries,
    getSeries,
    getSeason
} = require('../controllers/seriesController');

router.get('/discover', discoverSeries);
router.get('/search', searchSeries);
router.get('/:id', getSeries);
router.get('/:id/:number', getSeason);


module.exports = router;