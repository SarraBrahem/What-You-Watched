// routes/watchlistRoutes.js
const express = require('express');
const router = express.Router();
const { addWatchlistItem, removeWatchlistItem, updateWatchlistItem } = require('../controllers/watchlistController');

router.post('/add', addWatchlistItem);
router.delete('/remove/:id', removeWatchlistItem);
router.put('/update/:id', updateWatchlistItem);

module.exports = router;

