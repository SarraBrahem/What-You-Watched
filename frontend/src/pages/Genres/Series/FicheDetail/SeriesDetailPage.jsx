import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../../../components/Header/SeriesHeader";
import Footer from "../../../../components/Footer/Footer";
import { useWatchlist } from '../../../Watchlist/WatchlistContext';
import RatingStars from "../../../../components/Rating/RatingStars";
import axios from 'axios';

function SeriesDetails() {
  const { seriesId } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1); // État pour gérer la saison sélectionnée
  const [comments, setComments] = useState([]);  // Si les commentaires sont chargés dynamiquement
  const [newComment, setNewComment] = useState("");  // Gérer la saisie d'un nouveau commentaire
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seasonRef = useRef(null);  // Référence pour la section des saisons

  {/*GESTTION DE LA WATCHLIST*/ }
  const { watchlist, addToWatchlist, removeFromWatchlist, updateStatus, updateRating, updateWatchedEpisodes  } = useWatchlist();
  const seriesInWatchlist = watchlist.series.find(m => m.id === seriesId);
  {/*GESTION DE LA NOTATION*/ }
  const [rating, setRating] = useState(seriesInWatchlist ? seriesInWatchlist.rating : '');

  const [currentEpisode, setCurrentEpisode] = useState(0); // Définit à 0 initialement, ou toute autre logique d'initialisation adaptée

   {/*Watchlist*/ }
   useEffect(() => {
    if (seriesInWatchlist && seriesInWatchlist.rating) {
      setRating(seriesInWatchlist.rating);
    } else {
      setRating(''); // Réinitialiser la sélection quand il n'y a pas de note
    }
  }, [seriesInWatchlist]);

  const handleAddToWatchlist = () => {
    const item = {
      id: seriesId,
      title: series.name,
      poster: series.poster,
      totalEpisodes: series.totalEpisodes // Ajouter cette ligne pour inclure le nombre total d'épisodes
    };
    addToWatchlist(item, 'series');
  };

  const handleEpisodeChange = (event) => {
    const newEpisodeCount = parseInt(event.target.value);
    setCurrentEpisode(newEpisodeCount);  // Mettre à jour l'état local avec le nouvel épisode visionné
    updateWatchedEpisodes(seriesId, 'series', newEpisodeCount);  // Mise à jour du nombre d'épisodes visionnés dans le contexte global
  
    // Si un nouvel épisode est sélectionné et que ce n'est pas le premier, changer le statut en "En Cours"
    if (newEpisodeCount > 0 && seriesInWatchlist && seriesInWatchlist.status !== 'En Cours') {
      updateStatus(seriesId, 'series', 'En Cours');
    }
  };
  
  
  const handleChangeStatus = (event) => {
    if (event.target.value === 'Supprimer') {
      removeFromWatchlist(seriesId, 'series');
    } else {
      updateStatus(seriesId, 'series', event.target.value);
    }
  };

  {/*Notation*/ }
  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    updateRating(seriesId, 'series', newRating);
  };

  useEffect(() => {
    const fetchBaseData = async () => {
      setLoading(true);
      try {
        const baseUrl = `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${api_key}&language=fr-FR&append_to_response=credits,recommendations`;
        const response = await fetch(baseUrl);
        const data = await response.json();
        if (data) {
          setSeries({
            name: data.name,
            poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            background: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
            rating: data.vote_average,
            genres: data.genres.map(genre => genre.name),
            synopsis: data.overview,
            watchlistCount: data.popularity,
            commentCount: data.vote_count,
            seasons: data.seasons,
            episodes: [],
            cast: data.credits.cast.map(actor => ({
              name: actor.name,
              character: actor.character,
              photo: `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            })),
            similarSeries: data.recommendations.results.map(series => ({
              id: series.id,
              name: series.name,
              poster: `https://image.tmdb.org/t/p/w500${series.poster_path}`
            })),
          });
        } else {
          setError("Aucune donnée disponible pour cette série");
        }
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série", error);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };
    fetchBaseData();
  }, [seriesId, api_key]);


  // useEffect pour charger les épisodes spécifiques à la saison sélectionnée
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const seasonUrl = `https://api.themoviedb.org/3/tv/${seriesId}/season/${selectedSeason}?api_key=${api_key}&language=fr-FR`;
        const response = await fetch(seasonUrl);
        const data = await response.json();
        setSeries(prev => ({
          ...prev,
          episodes: data.episodes,
          totalEpisodes: data.episodes.length // Stocker le nombre total d'épisodes de la saison
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des épisodes", error);
      }
    };
    if (seriesId && selectedSeason) {
      fetchEpisodes();
    }
  }, [seriesId, selectedSeason, api_key]);
  

  {/*Chercher les Commentaires d'un film*/ }
  useEffect(() => {
    const fetchComments = async () => {
      const commentsUrl = `https://what-you-watched-backend.vercel.app/api/commentaires/${seriesId}`;
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
        Date: commentaire.date.split('T')[0] + " at " + commentaire.date.split('T')[1].split('.')[0],
        likesnumber: commentaire.likes.Number || 0,
        likes: commentaire.likes.idutilisateurs
      })));
    };
    fetchComments();
  }, [seriesId]);

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
        idmedia: seriesId
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
          Date: thenewcomment.date.split('T')[0] + " at " + thenewcomment.date.split('T')[1].split('.')[0],
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

  useEffect(() => {
    const fetchTrailer = async () => {
      const trailerUrl = `https://api.themoviedb.org/3/tv/${seriesId}/videos?api_key=${api_key}&language=en-US`;
      const response = await fetch(trailerUrl);
      const data = await response.json();
      const trailers = data.results.filter(video => video.type === 'Trailer');
      if (trailers.length > 0) {
        setSeries(prev => ({ ...prev, trailer: `https://www.youtube.com/watch?v=${trailers[0].key}` }));
      }
    };

    if (seriesId) {
      fetchTrailer();
    }
  }, [seriesId]);

  if (loading) return <div className="flex bg-yellow-500 h-full py-1/2 text-2xl text-white font-bold justify-center" >.........</div>;
  if (error) return <div className="bg-yellow-500">Erreur: {error}</div>;
  if (!series) return <div className="bg-yellow-500">No data available.</div>;

  return (
    <div>
      {/* Presentation de la Série */}
      <div style={{ backgroundImage: `url(${series.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={series.poster} alt="Poster du film" className="w-64 md:w-52 lg:w-64 h-96 md:h-72 lg:h-96 rounded-lg shadow-lg mb-5" />
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded md:ml-4 mb-3"
              onClick={() => window.open(series.trailer, '_blank')}>
              Lancer la Bande Annonce
            </button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2 text-center md:text-start">{series.name}</h2>
              <p className="mb-2 text-center md:text-start">{series.rating} <RatingStars rating={series.rating}/> </p>
              <p className="mb-2 text-sm md:text-xs text-center md:text-start">{series.genres.join(", ")}</p>
              <br />
              <p className="flex mb-4 text-xl font-bold justify-center md:justify-start">SYNOPSIS :</p>
              <p className='mb-8 w-full text-justify'>{series.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{series.watchlistCount}</p>
              <p>Ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{series.commentCount}</p>
              <p>Commentaires</p>
              <p>(IMDb)</p>
            </div>
            <div>
              {seriesInWatchlist ? (
                <select onChange={handleChangeStatus} value={seriesInWatchlist.status} className="bg-yellow-900 hover:bg-yellow-950 text-white text-center border-2 border-yellow-400 font-bold py-2 px-24 rounded mb-4 w-max">
                  <option value="En Cours" className="font-medium text-white bg-yellow-900">En Cours</option>
                  <option value="Terminé" className="font-medium text-white bg-yellow-900">Terminé</option>
                  <option value="En Pause" className="font-medium text-white bg-yellow-900">En Pause</option>
                  <option value="Abandonné" className="font-medium text-white bg-yellow-900">Abandonné</option>
                  <option value="Prévu" className="font-medium text-white bg-yellow-900">Prévu</option>
                  <option value="Supprimer" className="font-bold text-white bg-yellow-950">Supprimer</option> {/* Option pour supprimer le film */}
                </select>
              ) : (
                <button onClick={handleAddToWatchlist} className="bg-black hover:bg-yellow-900 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-16 rounded mb-4 w-max">
                  + Ajouter à la Watchlist
                </button>
              )}
            </div>
            <div>
              {seriesInWatchlist ? (
                <>
                  <div className="flex flex-row space-x-4">
                    <div className="bg-yellow-900 text-white border-2 border-yellow-400 font-bold py-2 px-4 rounded w-full flex items-center justify-between">
                      <select value={rating} onChange={handleRatingChange} className="bg-yellow-900 text-white text-center border-2 border-yellow-400 font-bold py-2 rounded w-max">
                        <option value="">Non noté</option>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(number => (
                          <option key={number} value={number}>{number}</option>
                        ))}
                      </select>
                      <span className="ml-1 text-xl">/10</span>
                    </div>
                    <div className="bg-yellow-900 text-white border-2 border-yellow-400 font-bold py-2 px-4 rounded w-full">
                      <label htmlFor="episode-select" className="mr-2">Épisodes:</label>
                      <select id="episode-select" value={currentEpisode} onChange={handleEpisodeChange} className="bg-yellow-900 text-white border-2 border-yellow-400 font-bold py-2 rounded w-full">
                        {Array.from({ length: series.totalEpisodes }, (_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <button className="bg-black hover:bg-yellow-900 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-[105px] rounded mb-4 w-max">
                  Noter le film
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
      </div>

      {/* Episode Switcher */}
      <div ref={seasonRef} className='flex overflow-x-auto scroll-smooth bg-yellow-500 p-4 text-white'>
        {series.seasons.map((season, index) => (
          <button key={index} onClick={() => setSelectedSeason(season.season_number)}
            className={`mx-2 px-6 py-1 rounded-xl ${selectedSeason === season.season_number ? 'bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'}`}>
            Saison {season.season_number}
          </button>
        ))}
      </div>

      {/* Liste des Épisodes */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Episodes</h1>
        <div className="overflow-y-auto max-h-[368px] grid grid-cols-1 md:grid-cols-2 gap-4">
          {series.episodes.map((episode, index) => (
            <div key={index} className="bg-yellow-950 p-4 rounded-lg">
              <h2 className="text-white font-bold">{`Episode ${episode.episode_number}: ${episode.name}`}</h2>
              <p className="text-white">{episode.overview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage de la distribution */}
      <div className='bg-yellow-600 py-10 px-16 md:pt-8 md:pb-10'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        <div className="flex overflow-x-auto">
          {series.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}>
              <img src={actor.photo} alt={actor.name} className="w-44 h-44 md:w-48 md:h-48 rounded-full object-cover" />
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p>
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Affichage des séries similaires */}
      <div className='bg-yellow-600 py-10 px-16 md:pt-8 md:pb-10'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {series.similarSeries?.map((similarSeries, index) => (
            <Link key={index} to={`/series/details/${similarSeries.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${similarSeries.id}`}>
              <div className="inline-block min-w-40 mr-4">
                <img src={similarSeries.poster} alt={similarSeries.name}
                  className="w-40 h-60 rounded-lg shadow-lg"
                />
                <p className="text-white mt-2">{similarSeries.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Zone de commentaires */}
      <div className="bg-yellow-600 p-16">
        <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
        <div className="mb-8">
          <textarea
            className="w-full bg-yellow-900 text-white p-4 rounded-lg border-2 border-yellow-400"
            placeholder="Ajoutez votre commentaire..."
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded mt-4"
            onClick={handlePostComment}
          >
            Publier
          </button>
        </div>
        {comments?.map((comment, index) => (
          <div key={index} className="bg-yellow-900 p-4 rounded-lg mb-4 border-2 border-black">
            <p className="text-yellow-200 font-bold mb-1">{comment.Username}</p>
            <p className="text-yellow-200 text-sm mb-1">{comment.Date}</p>

            <p className="text-white">{comment.Texte}</p>
            <button
              className="bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded mt-4"


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

export default SeriesDetails;