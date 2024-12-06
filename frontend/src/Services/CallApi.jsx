import axios from "axios";

{/*CONSTANTES NECESSAIRES AUX APPELS D'API*/}
const movieBaseUrl = 'https://api.themoviedb.org/3'
const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"

{/*APPEL D'API POUR LA GRANDE BANNIERE DE CHAQUE PAGE*/}
const getVideos = axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`)
const getMoviesSlider = axios.get(`${movieBaseUrl}/trending/movie/week?api_key=${api_key}`)
const getSeriesSlider = axios.get(`${movieBaseUrl}/trending/tv/week?api_key=${api_key}`)

{/*APPEL D'API POUR LES FILMS CLASSÉS PAR GENRE*/}
const movieByGenreBaseURL=`${movieBaseUrl}/discover/movie?api_key=${api_key}`;
const getMovieById=(id, page)=> axios.get(`${movieByGenreBaseURL}&with_genres=${id}&page=${page}`)

{/*APPEL D'API POUR LES SERIES CLASSÉES PAR GENRE*/}
const seriesByGenreBaseURL=`${movieBaseUrl}/discover/tv?api_key=${api_key}`;
const getSeriesById=(id, page)=> axios.get(`${seriesByGenreBaseURL}&with_genres=${id}&page=${page}`)

{/*APPEL D'API POUR LES CATEGORIES DE L'ACCUEIL*/}
const getCategBaseURL =(apiPath)=> axios.get(`${movieBaseUrl}/${apiPath}?api_key=${api_key}`);

{/*APPEL D'API POUR LES CATEGORIES DES FILMS ET SERIES*/}
const getMovieTVBaseURL =(apiPath, sort)=> axios.get(`${movieBaseUrl}/${apiPath}?api_key=${api_key}&${sort}`);

// APPEL D'API POUR LA RECHERCHE
const searchMulti = (query) => axios.get(`${movieBaseUrl}/search/multi?api_key=${api_key}&query=${encodeURIComponent(query)}`);


export default {getVideos, getMoviesSlider, getSeriesSlider, getCategBaseURL,
                getMovieById, getSeriesById, getMovieTVBaseURL, searchMulti};