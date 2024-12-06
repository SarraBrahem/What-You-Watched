import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../../../components/Header/MovieHeader";
import Footer from "../../../../components/Footer/Footer";
import { useWatchlist } from '../../../Watchlist/WatchlistContext';
import RatingStars from "../../../../components/Rating/RatingStars";
import axios from 'axios';


function MovieDetails() {
  const { movieId } = useParams();  // Assurez-vous que le nom du paramètre correspond à celui défini dans vos routes
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);  // Si les commentaires sont chargés dynamiquement
  const [newComment, setNewComment] = useState("");  // Gérer la saisie d'un nouveau commentaire
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  {/*GESTION DE LA WATCHLIST*/ }
  const { watchlist, addToWatchlist, removeFromWatchlist, updateStatus, updateRating, updateWatchedEpisodes } = useWatchlist();
  const movieInWatchlist = watchlist.movies.find(m => m.id === movieId);
  {/*GESTION DE LA NOTATION*/ }
  const [rating, setRating] = useState(movieInWatchlist ? movieInWatchlist.rating : '');
  {/*GESTION DES ÉPISODES*/ }
  const [currentEpisode, setCurrentEpisode] = useState(movieInWatchlist ? movieInWatchlist.watchedEpisodes : 0);

    {/*MovieDetails*/ }
    useEffect(() => {
      const fetchMovieDetails = async () => {
        setLoading(true);
        try {
          const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=fr-FR`;
          const response = await fetch(url);
          const data = await response.json();
          if (data) {
            setMovie({
              title: data.title,
              poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              background: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
              rating: data.vote_average,
              genres: data.genres.map(genre => genre.name),
              synopsis: data.overview,
              watchlistCount: data.popularity,
              commentCount: data.vote_count
            });
          } else {
            setError("Aucune donnée disponible pour ce film");
          }
          setLoading(false);
        } catch (error) {
          console.error("Erreur lors de la récupération des détails du film", error);
          setError("Erreur lors du chargement des données");
          setLoading(false);
        }
      };
      fetchMovieDetails();
    }, [movieId, api_key]);

  {/*Watchlist*/ }
  useEffect(() => {
    if (movieInWatchlist && movieInWatchlist.rating) {
      setRating(movieInWatchlist.rating);
    } else {
      setRating(''); // Réinitialiser la sélection quand il n'y a pas de note
    }
  }, [movieInWatchlist]);

  useEffect(() => {
    if (movieInWatchlist) {
      setCurrentEpisode(movieInWatchlist.watchedEpisodes);
    }
  }, [movieInWatchlist?.watchedEpisodes]); // S'assurer de surveiller le bon attribut pour les re-rendus



  {/*Notation*/ }
  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    updateRating(movieId, 'movie',newRating);
  };

  const handleEpisodeChange = (e) => {
    const newEpisodeCount = parseInt(e.target.value);
    setCurrentEpisode(newEpisodeCount);
    if (newEpisodeCount === 1) {
      updateWatchedEpisodes(movieId, 'movie', newEpisodeCount);  // Mise à jour du nombre d'épisodes visionnés
      updateStatus(movieId, 'movie', 'Terminé');  // Mise à jour du statut du film comme "Terminé"
    }
  };
  

  const handleAddToWatchlist = () => {
    const item = {
      id: movieId,
      title: movie.title,
      poster: movie.poster,
      totalEpisodes: 1,  // Assuming one episode per movie
      watchedEpisodes: 0
    };
    addToWatchlist(item, 'movie');
  };

  const handleChangeStatus = (event) => {
    if (event.target.value === 'Supprimer') {
      removeFromWatchlist(movieId, 'movie');
    } else {
      updateStatus(movieId, 'movie', event.target.value);
    }
  };


  {/*Casting*/ }
  useEffect(() => {
    const fetchCast = async () => {
      const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`;
      const response = await fetch(castUrl);
      const data = await response.json();
      setMovie(prev => ({
        ...prev,
        cast: data.cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          photo: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        }))
      }));
    };
    fetchCast();
  }, [movieId, api_key]);

  {/*Recommandations*/ }
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const similarUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&language=en-US`;
      const response = await fetch(similarUrl);
      const data = await response.json();
      setMovie(prev => ({
        ...prev,
        similarMovies: data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }))
      }));
    };
    fetchSimilarMovies();
  }, [movieId, api_key]);

  {/*Chercher les Commentaires d'un film*/ }
  useEffect(() => {
    const fetchComments = async () => {
      const commentsUrl = `https://what-you-watched-backend.vercel.app/api/commentaires/${movieId}`;
      const response = await fetch(commentsUrl);
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        try {
          const response = await fetch(`https://what-you-watched-backend.vercel.app/api/utilisateurs/${data[i].idutilisateur}/nometprenom`);

          if (!response.ok) {
            throw new Error("Utilisateur n'existe pas");
          }
          const details = await response.json();
          data[i].idutilisateur = { nom: details.nom, prenom: details.prenom };
        } catch (error) {
          console.error("Erreur lors de la récupération des détails de l'utilisateur", error);
          data[i].idutilisateur = { nom: "utilisateur", prenom: "n'existe pas" };
        }
      }
      setComments(data.map(commentaire => ({
        id: commentaire._id,
        Username: commentaire.idutilisateur.nom + " " + commentaire.idutilisateur.prenom,
        Texte: commentaire.contenu,
        Date: commentaire.date,
        likesnumber: commentaire.likes.Number || 0,
        likes: commentaire.likes.idutilisateurs
      })));
    };
    fetchComments();
  }, [movieId]);

  {/*Commentaires*/ }
  const token = localStorage.getItem('token');

  const handlelikeComment = (comment) => async () => {
    if (!localStorage.getItem('token')) {
      alert('Vous devez être connecté pour aimer un commentaire');
      return;
    }
    comment = { ...comment };
    const userrep = await axios.get('https://what-you-watched-backend.vercel.app/api/authRoutes/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (userrep.status !== 200) {
      console.log('Erreur lors de la récupération de l\'utilisateur');
      return;
    }

    if (comment.likes.includes(userrep.data.utilisateur._id)) {
      const response = await axios.post(`https://what-you-watched-backend.vercel.app/api/commentaires/dislike/${comment.id}`, { idutilisateur: userrep.data.utilisateur._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status !== 200) {
        console.log('Erreur lors de l\'envoi ');
        return;
      }
      comment.likes.pop(userrep.data.utilisateur._id);
      if (comment.likesnumber > 0) {
        comment.likesnumber = comment.likesnumber - 1;
      }
    } else {
      const response = await axios.post(`https://what-you-watched-backend.vercel.app/api/commentaires/like/${comment.id}`, { idutilisateur: userrep.data.utilisateur._id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status !== 200) {
        console.log('Erreur lors de l\'envoi ');
        return;
      }

      comment.likes.push(userrep.data.utilisateur._id);
      comment.likesnumber = comment.likesnumber + 1;
    }

    setComments(comments => comments.map(commenta => {
      if (commenta.id === comment.id) {
        return {
          ...commenta,
          likesnumber: comment.likesnumber,
          likes: comment.likes
        };
      }
      return commenta;
    }));

  };

  const handlePostComment = async () => {
    if (newComment.trim()) {
      //check if user is logged in
      if (!localStorage.getItem('token')) {
        alert('Vous devez être connecté pour commenter');
        return;
      }

      // get user from the jwt token

      const response = await axios.get('https://what-you-watched-backend.vercel.app/api/authRoutes/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status !== 200) {
        alert('Erreur lors de la récupération de l\'utilisateur');
        return;
      }

      const user = response.data.utilisateur;

      const sentComment = {
        contenu: newComment,
        idutilisateur: user._id,
        idmedia: movieId
      };

      try {
        const response = await axios.post('https://what-you-watched-backend.vercel.app/api/commentaires/', sentComment, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const thenewcomment = response.data;
        console.log(thenewcomment);
        setComments(prevComments => [{
          id: thenewcomment._id,
          Username: user.nom + " " + user.prenom,
          Texte: thenewcomment.contenu,
          Date: thenewcomment.date,
          likesnumber: thenewcomment.likes.number || 0,
          likes: thenewcomment.likes.idutilisateurs
        }, ...prevComments]);
        setNewComment("");  // Réinitialiser l'entrée de texte après l'envoi
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire", error);
        alert("Erreur lors de l'envoi du commentaire");
        return;
      }


    }
  };

  {/*Trailer*/ }
  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=fr-FR`;
      const response = await fetch(trailerUrl);
      const data = await response.json();
      const trailers = data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        setMovie(prev => ({ ...prev, trailer: `https://www.youtube.com/watch?v=${trailers[0].key}` }));
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);


  if (loading) return <div className="flex bg-red-600 h-full py-1/2 text-2xl text-white font-bold justify-center" >.........</div>;
  if (error) return <div className="bg-red-600">Erreur: {error}</div>;


  return (
    <div>
      <div style={{ backgroundImage: `url(${movie.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={movie.poster} alt="Poster du film" className="w-64 md:w-52 lg:w-64 h-96 md:h-72 lg:h-96 rounded-lg shadow-lg mb-5" />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:ml-4 mb-3"
              onClick={() => window.open(movie.trailer, '_blank')}>
              Lancer la Bande Annonce
            </button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2 text-center md:text-start">{movie.title}</h2>
              <p className="mb-2 text-center md:text-start">{movie.rating} <RatingStars rating={movie.rating} /></p>
              <p className="mb-2 text-sm md:text-xs text-center md:text-start">{movie.genres.join(", ")}</p>
              <br />
              <p className="flex mb-4 text-xl font-bold justify-center md:justify-start">SYNOPSIS :</p>
              <p className='mb-8 w-full text-justify'>{movie.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.watchlistCount}</p>
              <p>ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{movie.commentCount}</p>
              <p>commentaires</p>
            </div>
            <div>
              {movieInWatchlist ? (
                <select onChange={handleChangeStatus} value={movieInWatchlist.status} className="bg-red-900 hover:bg-red-950 text-white text-center border-2 border-red-400 font-bold py-2 px-24 rounded mb-4 w-max">
                  <option value="Prévu" className="font-medium text-white bg-red-900">Prévu</option>
                  <option value="Terminé" className="font-medium text-white bg-red-900">Terminé</option>
                  <option value="Abandonné" className="font-medium text-white bg-red-900">Abandonné</option>
                  <option value="Supprimer" className="font-bold text-white bg-red-950">Supprimer</option> {/* Option pour supprimer le film */}
                </select>
              ) : (
                <button onClick={handleAddToWatchlist} className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-16 rounded mb-4 w-max">
                  + Ajouter à la Watchlist
                </button>
              )}
            </div>
            <div>
              {movieInWatchlist ? (
                <>
                  <div className="flex flex-row space-x-4">
                    <div className="bg-red-900 text-white border-2 border-red-400 font-bold py-2 px-4 rounded w-full flex items-center justify-between">
                      <select value={rating} onChange={handleRatingChange} className="bg-red-900 text-white text-center border-2 border-red-400 font-bold py-2 rounded w-max">
                        <option value="">Non noté</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
                          <option key={number} value={number}>{number}</option>
                        ))}
                      </select>
                      <span className="ml-1 text-xl">/10</span>
                    </div>
                    <div className="bg-red-900 text-white border-2 border-red-400 font-bold py-2 px-4 rounded w-full">
                      <label htmlFor="episode-select" className="mr-2">Épisodes:</label>
                      <select id="episode-select" onChange={handleEpisodeChange} value={movieInWatchlist?.watchedEpisodes || 0} className="bg-red-900 text-white border-2 border-red-400 font-bold py-2 rounded w-full">
                        <option value="0">Non visionné</option>
                        <option value="1">Visionné</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <button className="bg-black hover:bg-red-900 hover:text-white text-red-600 border-2 border-red-400 font-bold py-2 px-[105px] rounded mb-4 w-max">
                  Noter le film
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
      </div>

      {/*Affichage de la distribution*/}
      <div className='bg-red-700 py-10 px-16 md:pt-8 md:pb-10'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        <div className="flex overflow-x-auto">
          {movie.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}>
              <img src={actor.photo} alt={actor.name} className="w-44 h-44 md:w-48 md:h-48 rounded-full object-cover" />
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p>
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Affichage des films similaires*/}
      <div className='bg-red-700 pb-10 px-16 md:pt-8 md:pb-10'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {movie.similarMovies?.map((simMovie, index) => (
            <Link key={index} to={`/films/details/${simMovie.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}}/${simMovie.id}`}>
              <div className="inline-block min-w-40 mr-4">
                <img src={simMovie.poster} alt={simMovie.title} className="w-40 h-60 rounded-lg shadow-lg" />
                <p className="text-white mt-2">{simMovie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Zone de commentaires */}
      <div className="bg-red-700 p-16">
        <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
        <div className="mb-8">
          <textarea
            className="w-full bg-red-900 text-white p-4 rounded-lg border-2 border-red-400"
            placeholder="Ajoutez votre commentaire..."
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="bg-black text-white hover:bg-white hover:text-red-700 font-bold py-2 px-4 rounded mt-4"
            onClick={handlePostComment}
          >
            Publier
          </button>
        </div>
        {comments?.map((comment, index) => (
          <div key={index} className="bg-red-900 p-4 rounded-lg mb-4 border-2 border-black">
            <p className="text-red-200 font-bold mb-1">{comment.Username}</p>
            <p className="text-red-200 text-sm mb-1">{comment.Date}</p>

            <p className="text-white">{comment.Texte}</p>
            <button
              className="bg-black text-white hover:bg-white hover:text-red-700 font-bold py-2 px-4 rounded mt-4"


              onClick={handlelikeComment(comment)}
            >
              J'aime ({comment.likesnumber})



            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetails;

