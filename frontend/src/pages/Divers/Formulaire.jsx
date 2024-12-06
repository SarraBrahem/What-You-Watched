import React from 'react';
import Header from '../../components/Header/SeriesDetailHeader';
import Footer from '../../components/Footer/Footer';
import CustomScrollBarS from '../../utiles/CustomScrollBar.css';

const QCM = () => {
  const serie = {
    title: "Snowfall",
    poster: "https://i.ebayimg.com/images/g/elQAAOSwQOxdTn7S/s-l1200.jpg",
    background: "https://m.media-amazon.com/images/S/pv-target-images/8359d0f13d351e2c2537fde7e0776a45476b0cfc0c35d1e25cebdec72f9b53cd.jpg",
    rating: "8.9 ★★★★★",
    genres: ["ACTION", "DRAME"],
    synopsis: "Comment le trafic du crack a changé la ville de Los Angeles dans les années 1980... Pauvreté, violence, drogue et prostitution constituent l’ADN de la ville, tandis que la ségrégation raciale bat toujours son plein. C'est ainsi qu'un dealer, un catcheur, un agent de la CIA et la nièce d'un parrain mexicain voient leurs routes se croiser.",
    watchlistCount: 120.815,
    commentCount: 1107,

    cast: [
      { name: "Damson Idris", character: "Franklin Saint", photo: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1031548_v9_bc.jpg"},
      { name: "Carter Hudson", character: "Teddy McDonald", photo: "https://m.media-amazon.com/images/M/MV5BMjAyNDA4NjcyMV5BMl5BanBnXkFtZTgwMDcyNTgwMTI@._V1_.jpg" },
      { name: "Isaiah John", character: "Leon Simmons", photo: "https://netstorage-legit.akamaized.net/images/c06c5bd53e906af2.jpg?imwidth=900" },
      { name: "Amin Joseph", character: "Jerome Saint", photo: "https://assets.fxnetworks.com/cms-next/production/1877e250-6fba-4c1b-aaba-d6192387506e.jpg" },
      { name: "Angela Lewis", character: "Tante Louie", photo: "https://blackmothersbreastfeeding.org/wp-content/uploads/2022/09/Screen-Shot-2022-08-29-at-1.05.26-PM-400x600.png" },
      { name: "Sergio Peris-Mencheta", character: "Gustavo 'El Oso' Zapata", photo: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/238343_v9_bb.jpg" },
      { name: "Michael Hyatt", character: "Cissy Saint", photo: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/v9/AllPhotos/311020/311020_v9_bb.jpg" },
      { name: "Filipe Valle Costa", character: "Pedro Nava", photo: "https://resizing.flixster.com/Zg7iJnusOMPjpeyB2GI4oaxpR4E=/218x280/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1090104_v9_ba.jpg" },
    ],
  
    episodes: [
      { title: "Pilote", season: 1, episode: 1, synopsis: "Franklin peine à répondre aux exigences de son organisation en pleine croissance." },
      { title: "Fais-les voler", season: 1, episode: 2, synopsis: "Franklin prend des mesures extrêmes lorsque l'insatisfaction au sein de son équipe atteint un point critique." },
      { title: "Une longue attente", season: 1, episode: 3, synopsis: "L'activité de Franklin s'intensifie, compliquant la vie de tous les impliqués." },
      { title: "Les Règles du Jeu", season: 1, episode: 4, synopsis: "Les alliances se forment et les trahisons émergent au sein du cartel." },
      { title: "La Chute", season: 1, episode: 5, synopsis: "Un événement tragique bouleverse la dynamique du pouvoir dans le monde de la drogue." },
      { title: "Réveil Brutal", season: 1, episode: 6, synopsis: "Franklin doit faire face aux conséquences de ses actions sur sa famille et ses amis." },
    ],
  };
  
  const comments = [
    { user: "JaneDoe", text: "Absolutely love the complexity of characters in Snowfall." },
    { user: "SeriesFanatic", text: "Snowfall does an incredible job depicting the 80s crack epidemic." },
    { user: "DramaLover", text: "Can't wait for the next season!" },
  ];

  return (
    <div>
      <div style={{ backgroundImage: `url(${serie.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Header />
        <div className="flex flex-col md:flex-row p-8 bg-black bg-opacity-70 text-white rounded-xl m-5 items-center md:items-start">
          <div className="md:w-1/4 flex flex-col items-center md:items-start">
            <img src={serie.poster} alt="Poster du film" className="w-64 h-96 rounded-lg shadow-lg mb-5"/>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0">Lancer la Bande Annonce</button>
          </div>
          <div className="md:ml-4 md:w-2/3">
            <div className="flex flex-col md:ml-4">
              <h2 className="text-4xl font-bold mb-2">{serie.title}</h2>
              <p className="mb-2">{serie.rating}</p>
              <p className="mb-2 text-xs">{serie.genres.join(", ")}</p>
              <br />
              <p className="mb-4 font-bold">SYNOPSIS :</p>
              <p className='w-3/4'>{serie.synopsis}</p>
            </div>
          </div>
          <div className="md:w-1/4 flex flex-col items-center md:items-start md:ml-8 mx-10 px-4">
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{serie.watchlistCount}</p>
              <p>ont ajouté ce film à leur Watchlist</p>
            </div>
            <div className="bg-black p-4 rounded-lg mb-4 text-center w-full">
              <p className='font-bold text-2xl antialiased'>{serie.commentCount}</p>
              <p>commentaires</p>
            </div>
            <button className="bg-black hover:bg-yellow-700 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded mb-4 w-full">+ Ajouter à la Watchlist</button>
            <button className="bg-black hover:bg-yellow-700 hover:text-white text-yellow-600 border-2 border-yellow-400 font-bold py-2 px-4 rounded w-full">Noter le film</button>
          </div>
        </div>
        <br />
      </div>

      {/* Section Episodes */}
      <div className='bg-yellow-600 p-16'>
          <h1 className='text-white text-3xl mb-8 font-semibold'>Épisodes</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {serie.episodes.map((episode, index) => (
              <div key={index} className="bg-yellow-900 rounded-lg p-4 shadow-lg shadow-black">
                <h2 className="text-white font-bold">{`S${episode.season}E${episode.episode} - ${episode.title}`}</h2>
                <p className="text-white">{episode.synopsis}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Distribution Section */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-8 font-semibold'>Distribution</h1>
        {/* Exemple d'une liste horizontale pour la distribution (Utiliser Tailwind CSS pour le style) */}
        <div className="flex overflow-x-auto">
          {serie.cast?.map((actor, index) => (
            <div key={index} className="flex flex-col items-center mr-4" style={{ minWidth: '200px' }}> {/* Ajustement ici */}
              <img src={actor.photo} alt={actor.name} className="w-48 h-48 rounded-full object-cover"/>
              <p className="text-white mt-2 font-extrabold text-lg text-center">{actor.name}</p> {/* Centrez le texte ici */}
              <p className="text-white text-center font-semibold text-sm">{actor.character}</p> {/* Centrez le texte ici */}
            </div>
          ))}
        </div>
      </div>

      {/* Recommandations Section */}
      <div className='bg-yellow-600 p-16'>
        <h1 className='text-white text-3xl mb-4 font-semibold'>Les utilisateurs ont également regardé</h1>
        <div className="flex overflow-x-auto">
          {/* Supposons que vous avez un tableau 'similarseries' dans 'serie' */}
          {serie.similarseries?.map((serie, index) => (
            <div key={index} className="flex flex-col items-center mr-4">
              <img src={serie.poster} alt={serie.title} className="w-40 h-60 rounded-lg shadow-lg"/>
              <p className="text-white mt-2">{serie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-yellow-600 p-16">
        <h1 className='text-white text-3xl mb-4 font-semibold'>Commentaires</h1>
        <div className="mb-8">
          <textarea
            className="w-full bg-yellow-900 text-white p-4 rounded-lg border-2 border-yellow-400"
            placeholder="Ajoutez votre commentaire..."
            rows="3"
          ></textarea>
          <button className="bg-black text-white hover:bg-white hover:text-yellow-700  font-bold py-2 px-4 rounded mt-4">Publier</button>
        </div>
        {comments.map((comment, index) => (
          <div key={index} className="bg-yellow-900 p-4 rounded-lg mb-4 border-2 border-black">
            <p className="text-yellow-200 font-bold mb-1">{comment.user}</p>
            <p className="text-white">{comment.text}</p>
          </div>
        ))}
        <button className="w-full bg-black text-white hover:bg-white hover:text-yellow-700 font-bold py-2 px-4 rounded">Voir tous les commentaires</button>
      </div>
      <Footer/>
    </div>
  );
}

export default QCM;