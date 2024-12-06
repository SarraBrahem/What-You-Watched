const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {
    getActor,
    searchActor
} = require('../controllers/acteursController');

router.get('/search', searchActor);
router.get('/:id', getActor);


module.exports = router;