const Utilisateur = require('../models/utilisateursModel');
const axios = require('axios');

const ajouterSerieWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId, saison, episode } = req.body;

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $addToSet: { seriesWatchlist: { tmdbId, saison, episode, progress: 0 } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.seriesWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const retirerSerieWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId } = req.body;

    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, {
            $pull: { seriesWatchlist: { tmdbId } }
        }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.seriesWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenirSerieWatchlist = async(req, res) => {
    const { id } = req.params;

    try {
        const utilisateur = await Utilisateur.findById(id);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur.seriesWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const majpSerieWatchlist = async(req, res) => {
    const { id } = req.params;
    const { tmdbId, saison, episode, progress } = req.body;

    try {
        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id, 'seriesWatchlist.tmdbId': tmdbId, 'seriesWatchlist.saison': saison, 'seriesWatchlist.episode': episode }, { $set: { 'seriesWatchlist.$.progress': progress } }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur ou série de watchlist non trouvée" });
        }
        res.status(200).json(utilisateur.seriesWatchlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const seriesGenres = {
    ActionAdventure: 10759,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Kids: 10762,
    Mystery: 9648,
    News: 10763,
    Reality: 10764,
    SciFiFantasy: 10765,
    Soap: 10766,
    Talk: 10767,
    WarPolitics: 10768,
    Western: 37
};

const fetchMostFrequentSerieGenre = async(seriesWatchlist) => {
    const genreCounts = {};
    const options = {
        headers: {
            Authorization: `Bearer ${process.env.TMDBAPIKEY}`
        }
    };

    for (const item of seriesWatchlist) {
        const tmdbId = item.tmdbId;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${tmdbId}?language=fr-FR`, options);
            const serieGenres = response.data.genres;
            serieGenres.forEach((genre) => {
                genreCounts[genre.id] = (genreCounts[genre.id] || 0) + 1;
            });
        } catch (error) {
            console.error(`Error fetching serie details for tmdbId ${tmdbId}: `, error);
        }
    }

    let mostFrequentGenreId = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b, null);
    return mostFrequentGenreId;
};

const obtenirRecommandationsSerie = async(req, res) => {
    const { id } = req.params;
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.TMDBAPIKEY
        }
    };

    try {
        const utilisateur = await Utilisateur.findById(id);

        if (!utilisateur || !utilisateur.seriesWatchlist || utilisateur.seriesWatchlist.length === 0) {
            return res.status(404).json({ message: "La watchlist de séries est vide ou l'utilisateur n'a pas été trouvé." });
        }

        const mostFrequentGenreId = await fetchMostFrequentSerieGenre(utilisateur.seriesWatchlist);
        if (!mostFrequentGenreId) {
            return res.status(404).json({ message: "Aucun genre fréquent n'a été trouvé dans la watchlist de séries." });
        }

        const recommendationsUrl = `https://api.themoviedb.org/3/discover/tv?with_genres=${mostFrequentGenreId}&language=fr-FR`;
        const recommendationsResponse = await axios.get(recommendationsUrl, options);
        const recommendations = recommendationsResponse.data.results;

        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Erreur lors de la récupération des recommandations de séries:', error);
        res.status(500).json({ error: `Erreur lors de la récupération des recommandations de séries: ${error.message}` });
    }
};

module.exports = {
    ajouterSerieWatchlist,
    retirerSerieWatchlist,
    obtenirSerieWatchlist,
    majpSerieWatchlist,
    obtenirRecommandationsSerie
};