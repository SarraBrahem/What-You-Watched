require('dotenv').config();
const express = require('express');
const router = express.Router();

const {
    ajouterCommentaire,
    supprimerCommentaire,
    consulterCommentairesDeMedia,
    likeCommentaire,
    dislikeCommentaire
} = require('../controllers/commentairesController');

const { verifyToken, userOnly } = require('../middleware/authMiddleware');


router.post('/', verifyToken, ajouterCommentaire);
router.get('/:idmedia', consulterCommentairesDeMedia);
router.delete('/:idmedia/:id', verifyToken, supprimerCommentaire);
router.post('/like/:id', verifyToken, likeCommentaire);
router.post('/dislike/:id', verifyToken, dislikeCommentaire);

module.exports = router;
