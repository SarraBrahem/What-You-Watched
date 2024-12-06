require('dotenv').config();

const fetch = require('node-fetch');

const base_url = 'https://image.tmdb.org/t/p/original'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};

const getgenre = (genre_id) => {
    const genres = [
        { id: 10759, name: 'Action & Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comédie' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentaire' },
        { id: 18, name: 'Drame' },
        { id: 10751, name: 'Familial' },
        { id: 10762, name: 'Kids' },
        { id: 9648, name: 'Mystère' },
        { id: 10763, name: 'News' },
        { id: 10764, name: 'Reality' },
        { id: 10765, name: 'Science-Fiction & Fantastique' },
        { id: 10766, name: 'Soap' },
        { id: 10767, name: 'Talk' },
        { id: 10768, name: 'War & Politics' },
        { id: 37, name: 'Western' }
    ]
    for (let i = 0; i < genres.length; i++) {

        if (genres[i].id === parseInt(genre_id)) {
            return genres[i].name;
        }
    }

    return "incconu";
}


const searchSeries = async (req, res) => {
    const name = req.query.q;
    const search_url = 'https://api.themoviedb.org/3/search/tv?query=' +
        name.split(' ').join('%20') + '&include_adult=false&language=fr-FR&page=1';
    const series = await fetch(search_url, options)
        .then(res => res.json())
        .then(json => {
            return json.results.map((serie) => {
                let id = serie.id;
                let titre = serie.name;
                let poster = base_url + serie.poster_path;
                if (poster === base_url + 'null') {
                    poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                }
                let number_of_episodes = serie.number_of_episodes;
                let number_of_seasons = serie.number_of_seasons;
                let date_sortie = serie.first_air_date;
                let rating = serie.vote_average;
                let genre = serie.genre_ids.map((genre_id) => {
                    return getgenre(genre_id)
                });
                return serie = { id, titre, poster, number_of_episodes, number_of_seasons, date_sortie, rating, genre };
            });
        })
        .catch(err => {
            return res.status(404).json({ error: 'Aucune série trouvé : ' + err });
        });

    try {
        return res.status(200).json(series);
    } catch (error) {
        return res.status(500).json({ error: 'Erreur serveur' });
    }
}

const discoverSeries = async (req, res) => {
    const url = 'https://api.themoviedb.org/3/discover/tv?language=fr-FR'
        + '&sort_by=popularity.desc&page=1&page=2&include_adult=false';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let data = json.results.map(serie => {
                let id = serie.id
                let titre = serie.name
                let poster = base_url + serie.poster_path
                if (serie.poster_path === null) {
                    poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                }
                let vote_average = serie.vote_average
                let genre = serie.genre_ids.map(getgenre)
                return {
                    id,
                    titre,
                    poster,
                    vote_average,
                    genre
                }
            });
            return res.status(200).json(data);
        }).catch(err => {
            return res.status(500).json({ error: 'Erreur lors de la récupération des séries : ' + err });
        });
}

const getSeries = async (req, res) => {
    const id = req.params.id;
    const url = 'https://api.themoviedb.org/3/tv/' + id + '?language=fr-FR';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let titre = json.name
            let synopsis = json.overview
            let poster = base_url + json.poster_path
            if (poster === base_url + 'null') {
                poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
            }
            let background = base_url + json.backdrop_path
            if (background === base_url + 'null') {
                background = 'https://via.placeholder.com/1000x1770.png?text=No+Background+Available+!';
            }
            let date_sortie = json.first_air_date
            let rating = json.vote_average
            let genre = json.genres.map((genre) => {
                return genre.name;
            });
            let nombre_saisons = json.number_of_seasons;
            let nombre_episodes = json.number_of_episodes;
            let saisons = json.seasons.map((saison) => {
                let titre = saison.name;
                let poster = base_url + saison.poster_path;
                if (poster === base_url + 'null') {
                    poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                }
                let tmdb_id = saison.id;
                let overview = saison.overview;
                let nombre_saison = saison.season_number;
                let date_sortie = saison.air_date;
                let rating = saison.vote_average;
                return saison = { titre, poster, tmdb_id, overview, nombre_saison, date_sortie, rating };
            });
            const details = { id, titre, date_sortie, poster, background, synopsis, rating, genre, nombre_saisons, nombre_episodes, saisons };
            return res.status(200).json(details);
        }).catch(err => {
            return res.status(404).json({ error: 'Série non trouvée : ' + err });
        });
}

const getSeason = async (req, res) => {
    const id = req.params.id;
    const number = req.params.number;
    const url = 'https://api.themoviedb.org/3/tv/' + id + '/season/' + number + '?language=fr-FR';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let titre = json.name
            let poster = base_url + json.poster_path
            if (poster === base_url + 'null') {
                poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
            }
            let tmdb_id = json.id
            let overview = json.overview
            let nombre_saison = json.season_number
            let date_sortie = json.air_date
            let rating = json.vote_average
            let episodes = json.episodes.map(episode => {
                let titre = episode.name
                let tmdb_id = episode.id
                let overview = episode.overview
                let poster = base_url + episode.still_path
                if (poster === base_url + 'null') {
                    poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                }
                let numero_saison = episode.season_number
                let numero_episode = episode.episode_number
                let date_sortie = episode.air_date
                let rating = episode.vote_average
                let cast = [];
                let crew = [];
                if (episode.guest_stars.length > 0) {
                    cast = episode.guest_stars.map((member) => {
                        return { id: member.id, name: member.name, role: member.character, photo: base_url + member.profile_path }
                    });
                }

                if (episode.crew.length > 0) {
                    cast = episode.crew.map((member) => {
                        return { id: member.id, name: member.name, character: member.character, photo: base_url + member.profile_path }
                    });
                    crew = episode.crew.map((member) => {
                        return { id: member.id, name: member.name, job: member.job, photo: base_url + member.profile_path }
                    });
                }
                return episode = { titre, tmdb_id, overview, poster, numero_episode, numero_saison, date_sortie, rating, crew, cast };
            });
            const saison = { titre, poster, tmdb_id, overview, nombre_saison, date_sortie, rating, episodes };
            return res.status(200).json(saison);
        }).catch(err => {
            return res.status(404).json({ error: 'Saison non trouvée : ' + err });
        });
}

module.exports = {
    searchSeries,
    discoverSeries,
    getSeries,
    getSeason
}