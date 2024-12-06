require('dotenv').config();

const fetch = require('node-fetch');
const axios = require('axios');

const base_url = 'https://image.tmdb.org/t/p/original'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};


const trailerFilm = async(movieId) => {

    try {
        const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/videos?language=fr-FR';
        const response = await axios.get(url, options);
        const trailers = response.data.results.filter(video => video.site === 'YouTube');
        let trailerKey = null;
        if (trailers.length > 0) {
            const officialTrailers = trailers.filter(video => video.type === 'Trailer' && video.official);
            if (officialTrailers.length > 0) {
                trailerKey = officialTrailers[0].key;
            } else {
                trailerKey = trailers[0].key;
            }
            return `https://www.youtube.com/watch?v=${trailerKey}`
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la bande-annonce : ' + error);
        return null;
    }
}

getgenre = (genre_id) => {
    switch (genre_id) {
        case 28:
            return 'Action';
        case 12:
            return 'Aventure';
        case 16:
            return 'Animation';
        case 35:
            return 'Comédie';
        case 80:
            return 'Crime';
        case 99:
            return 'Documentaire';
        case 18:
            return 'Drame';
        case 10751:
            return 'Famille';
        case 14:
            return 'Fantastique';
        case 36:
            return 'Histoire';
        case 27:
            return 'Horreur';
        case 10402:
            return 'Musique';
        case 9648:
            return 'Mystère';
        case 10749:
            return 'Romance';
        case 878:
            return 'Science-Fiction';
        case 10770:
            return 'Téléfilm';
        case 53:
            return 'Thriller';
        case 10752:
            return 'Guerre';
        case 37:
            return 'Western';
        default:
            return 'Inconnu';
    }
}

const discoverMovies = async(req, res) => {
    const url = 'https://api.themoviedb.org/3/discover/movie?language=fr-FR' +
        '&sort_by=popularity.desc&page=1&page=2&include_adult=false';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let data = json.results.map(movie => {
                    let id = movie.id
                    let titre = movie.title
                    let poster = base_url + movie.poster_path
                    if (movie.poster_path === null) {
                        poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                    }
                    let vote_average = movie.vote_average
                    let genre = movie.genre_ids.map(getgenre)
                    return {
                        id,
                        titre,
                        poster,
                        vote_average,
                        genre
                    }
                }

            );
            return res.status(200).json(data);
        }).catch(err => {
            return res.status(500).json({ error: 'Erreur lors de la récupération des films : ' + err });
        });
}

const searchMovies = async(req, res) => {
    const name = req.query.q;
    const url = 'https://api.themoviedb.org/3/search/movie?query=' +
        name.split(' ').join('%20') + '&sort_by=rating.desc&include_adult=false&language=fr-FR&page=1&page=2';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let data = json.results.map(movie => {

                let titre = movie.title
                let id = movie.id
                let poster = base_url + movie.poster_path
                if (movie.poster_path === null) {
                    poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
                }
                let background = base_url + movie.backdrop_path
                if (movie.backdrop_path === null) {
                    background = 'https://via.placeholder.com/1000x1770.png?text=No+Background+Available+!';
                }
                let synopsis = movie.overview
                let date_sortie = movie.release_date
                let rating = movie.vote_average
                let genre = movie.genre_ids.map(getgenre)
                return {
                    id,
                    titre,
                    poster,
                    background,
                    synopsis,
                    date_sortie,
                    rating,
                    genre
                }
            });
            return res.status(200).json(data);
        }).catch(err => {
            return res.status(500).json({ error: 'Erreur lors de la récupération des films : ' + err });
        });
}

const getmovie = async(req, res) => {
    const movieId = req.params.id;
    const url = 'https://api.themoviedb.org/3/movie/' + movieId + '?language=fr-FR';
    fetch(url, options)
        .then(res => res.json())
        .then(async(json) => {
            const titre = json.title
            const id = json.id
            const poster = base_url + json.poster_path
            if (json.poster_path === null) {
                poster = 'https://via.placeholder.com/1000x1500.png?text=No+Poster+Available+!';
            }
            const background = base_url + json.backdrop_path
            if (json.backdrop_path === null) {
                background = 'https://via.placeholder.com/1600x900.png?text=No+Background+Available+!';
            }
            const synopsis = json.overview
            const date_sortie = json.release_date
            const rating = json.vote_average
            const genre = json.genres.map(genre => genre.name)
            const duree = json.runtime
            const budget = json.budget
            const revenue = json.revenue
            const status = json.status
            const tagline = json.tagline
            const trailer = await trailerFilm(movieId)


            const credits_url = 'https://api.themoviedb.org/3/movie/' + movieId + '/credits?language=fr-FR';


            let { acteurs, realisateurs, producteurs, scenaristes } = await fetch(credits_url, options)
                .then(res => res.json())
                .then(json => {
                    let acteurs = json.cast.map(cast => {
                        return {
                            id: cast.id,
                            nom: cast.name,
                            role: cast.character,
                            photo: base_url + cast.profile_path ? base_url + cast.profile_path : 'https://via.placeholder.com/100x150.png?text=No+Image+Available+!'
                        }
                    });
                    let realisateurs = json.crew.filter(crew => crew.job === 'Director').map(crew => {
                        return {
                            id: crew.id,
                            nom: crew.name,
                            photo: base_url + crew.profile_path ? base_url + crew.profile_path : 'https://via.placeholder.com/100x150.png?text=No+Image+Available+!'
                        }
                    });
                    let producteurs = json.crew.filter(crew => crew.job === 'Producer').map(crew => {
                        return {
                            id: crew.id,
                            nom: crew.name,
                            photo: base_url + crew.profile_path ? base_url + crew.profile_path : 'https://via.placeholder.com/100x150.png?text=No+Image+Available+!'
                        }
                    });
                    let scenaristes = json.crew.filter(crew => crew.job === 'Screenplay').map(crew => {
                        return {
                            id: crew.id,
                            nom: crew.name,
                            photo: base_url + crew.profile_path ? base_url + crew.profile_path : 'https://via.placeholder.com/100x150.png?text=No+Image+Available+!'
                        }
                    });
                    return { acteurs, realisateurs, producteurs, scenaristes };
                }).catch(err => console.error('error:' + err));
            const details = {
                id,
                titre,
                poster,
                background,
                synopsis,
                date_sortie,
                rating,
                genre,
                duree,
                budget,
                revenue,
                status,
                tagline,
                trailer,
                acteurs,
                realisateurs,
                producteurs,
                scenaristes
            };
            return res.status(200).json(details);
        }).catch(err => {
            return res.status(500).json({ error: 'Erreur lors de la récupération des films : ' + err });
        });
}



module.exports = {
    discoverMovies,
    searchMovies,
    getmovie
}