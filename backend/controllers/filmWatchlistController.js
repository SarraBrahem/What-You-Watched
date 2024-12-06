const Utilisateur = require('../models/utilisateursModel');
const axios = require('axios');

const ajouterFilmWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId } = req.body;

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $addToSet: { filmsWatchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retirerFilmWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId } = req.body;

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $pull: { filmsWatchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const obtenirFilmWatchlist = async(req, res) => {
    const { id } = req.params;

    try {
        const utilisateur = await Utilisateur.findById(id).populate('filmsWatchlist');;
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const majpFilmWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId, progress } = req.body;

    try {
        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id, 'filmsWatchlist.tmdbId': tmdbId }, { $set: { 'filmsWatchlist.$.progress': progress } }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur ou élément de watchlist non trouvé" });
        }

        res.status(200).json(utilisateur.filmsWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

const genres = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    ScienceFiction: 878,
    TVMovie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37
};


const fetchMostFrequentGenre = async(filmsWatchlist) => {
    const genreCounts = {};
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDBAPIKEY}`
        }
    };

    for (const item of filmsWatchlist) {
        var tmdbId = item.tmdbId;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?language=fr-FR`, options);
            const movieGenres = response.data.genres;
            movieGenres.forEach((genre) => {
                genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
            });
        } catch (error) {
            console.error(`Error fetching movie details for tmdbId ${tmdbId}: `, error);
        }
    }

    let mostFrequentGenreId = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b, null);
    return mostFrequentGenreId;
};


const obtenirRecommandationsFilm = async(req, res) => {
    const { id } = req.params;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.TMDBAPIKEY
        }
    };

    try {
        const utilisateur = await Utilisateur.findById(id);

        if (!utilisateur || !utilisateur.filmsWatchlist || utilisateur.filmsWatchlist.length === 0) {
            return res.status(404).json({ message: "Watchlist vide ou utilisateur non trouvé" });
        }

        const mostFrequentGenreId = await fetchMostFrequentGenre(utilisateur.filmsWatchlist);
        if (!mostFrequentGenreId) {
            return res.status(404).json({ message: "Aucun genre fréquent trouvé dans la watchlist" });
        }

        const recommendationsUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${mostFrequentGenreId}&language=fr-FR`;
        const recommendationsResponse = await axios.get(recommendationsUrl, options);
        const recommendations = recommendationsResponse.data.results;

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des recommandations: ' + error.message });
    }
};

module.exports = {
    ajouterFilmWatchlist,
    retirerFilmWatchlist,
    obtenirFilmWatchlist,
    majpFilmWatchlist,
    obtenirRecommandationsFilm
};