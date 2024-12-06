const { query } = require('express');
const fetch = require('node-fetch');
const base_url = 'https://image.tmdb.org/t/p/original/';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};



const getActor = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ error: 'Aucun ID d\'acteur fourni' });
    }
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'ID d\'acteur invalide' });
    }
    if (id < 1) {
        return res.status(400).json({ error: 'ID d\'acteur invalide' });
    }
    const url = 'https://api.themoviedb.org/3/person/' + id + '?language=fr-FR' + '&append_to_response=movie_credits,tv_credits,awa' + '&include_adult=false';
    try {
        fetch(url, options)
            .then(res => res.json())
            .then(json => {

                let nom = json.name;
                let id = json.id;
                let genre = json.gender === 1 ? 'Femme' : 'Homme';
                let photo = base_url + json.profile_path;
                let biographie = json.biography;
                if (biographie === '') {
                    biographie = 'Biographie non disponible';
                }
                let date_naissance = json.birthday;
                if (date_naissance === null) {
                    date_naissance = 'Date de naissance non disponible';
                }
                let lieu_naissance = json.place_of_birth;
                if (lieu_naissance === null) {
                    lieu_naissance = 'Lieu de naissance non disponible';
                }
                let popularite = json.popularity;
                if (popularite === null) {
                    popularite = 'Popularité non disponible';
                }
                let films = json.movie_credits.cast;
                let series = json.tv_credits.cast;
                films = films.map(film => {
                    return { id: film.id, titre: film.title, role: film.character, poster: base_url + film.poster_path }
                });
                series = series.map(serie => {
                    return { id: serie.id, titre: serie.name, role: serie.character, poster: base_url + serie.poster_path }
                });
                const details = { id, nom, genre, photo, biographie, date_naissance, lieu_naissance, popularite, films, series };
                if (!details) {
                    return res.status(404).json({ error: 'Acteur non trouvé' });
                }
                return res.status(200).json(details);
            }).catch(err => console.error('error:' + err));
    } catch (error) {
        return res.status(500).json({ error: 'Erreur serveur' });
    }


}

const searchActor = async (req, res) => {
    let query = req.query.q;
    query = query.split(' ').join('%20');
    const url = 'https://api.themoviedb.org/3/search/person?query=' + query + '&language=fr-FR&page=1&include_adult=false&page=1&page=2';
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            let acteurs = json.results.map(acteur => {
                return { id: acteur.id, nom: acteur.name, photo: base_url + acteur.profile_path, popularite: acteur.popularity }
            });
            acteurs = acteurs.filter(acteur => acteur.photo !== base_url + 'null');

            acteurs = acteurs.sort((a, b) => {
                return parseFloat(b.popularite) - parseFloat(a.popularite);
            });
            return res.status(200).json(acteurs);
        }).catch(err => { return res.status(500).json({ error: err }) });

}

module.exports = {
    getActor,
    searchActor
}


