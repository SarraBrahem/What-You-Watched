const express = require('express');
const {
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur,
    majmot_de_passe,
    obtenirNometPrenom
} = require('../controllers/utilisateursController');

const {
    ajouterFilmWatchlist,
    retirerFilmWatchlist,
    obtenirFilmWatchlist,
    majpFilmWatchlist,
    obtenirRecommandationsFilm
} = require('../controllers/filmWatchlistController');

const {
    ajouterSerieWatchlist,
    retirerSerieWatchlist,
    obtenirSerieWatchlist,
    majpSerieWatchlist,
    obtenirRecommandationsSerie
} = require('../controllers/serieWatchlistController');

const { verifyToken, adminOnly, userOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, adminOnly, obtenirUtilisateurs);
router.get('/:id', verifyToken, userOnly, obtenirUtilisateur);
router.delete('/:id', verifyToken, adminOnly, supprimerUtilisateur);
router.patch('/:id', verifyToken, userOnly, majUtilisateur);
router.patch('/:id/mot_de_passe',verifyToken,userOnly, majmot_de_passe);
router.get('/:id/nometprenom', obtenirNometPrenom);

router.post('/:id/filmsWatchlist', verifyToken, userOnly, ajouterFilmWatchlist);
router.delete('/:id/filmsWatchlist', verifyToken, userOnly, retirerFilmWatchlist);
router.get('/:id/filmsWatchlist', verifyToken, userOnly, obtenirFilmWatchlist);
router.patch('/:id/filmsWatchlist', verifyToken, userOnly, majpFilmWatchlist);
router.get('/:id/recommandationsFilm', verifyToken, userOnly, obtenirRecommandationsFilm);

router.post('/:id/seriesWatchlist', verifyToken, userOnly, ajouterSerieWatchlist);
router.delete('/:id/seriesWatchlist', verifyToken, userOnly, retirerSerieWatchlist);
router.get('/:id/seriesWatchlist', verifyToken, userOnly, obtenirSerieWatchlist);
router.patch('/:id/seriesWatchlist', verifyToken, userOnly, majpSerieWatchlist);
router.get('/:id/seriesRecommendations', verifyToken, userOnly, obtenirRecommandationsSerie);

module.exports = router;