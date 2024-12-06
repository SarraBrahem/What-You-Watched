import React, { useState } from 'react';
import WatchlistItem from './Items';
import { useWatchlist } from './WatchlistContext';

function FilmsSection() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [showFilmsTerminer, setShowFilmsTerminer] = useState(false);
  const [showFilmsAbandon, setShowFilmsAbandon] = useState(false);
  const [showFilmsPrevu, setShowFilmsPrevu] = useState(true);

  return (
    <section id="films" className="p-4">
      {/* Section "Prévus" */}
      <h2 className="bg-gradient-to-r from-red-700 to-orange-600 text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsPrevu(!showFilmsPrevu)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsPrevu ? '▼' : '☰'}
        </span>
        Prévus
      </h2>
      {showFilmsPrevu && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.movies.filter(movie => movie.status === 'Prévu').map(film => (
            <WatchlistItem key={film.id} {...film} type ='movie' removeItem={() => removeFromWatchlist(film.id, 'movie')} />
          ))}
        </div>
      )}
            
      {/* Section "Terminés" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsTerminer(!showFilmsTerminer)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsTerminer ? '▼' : '☰'}
        </span>
        Terminés
      </h2>
      {showFilmsTerminer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.movies.filter(movie => movie.status === 'Terminé').map(film => (
            <WatchlistItem key={film.id} {...film} type ='movie' removeItem={() => removeFromWatchlist(film.id, 'movie')} />
          ))}
        </div>
      )}

      {/* Section "Abandonnés" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-red-700 p-1 rounded-md pl-4" onClick={() => setShowFilmsAbandon(!showFilmsAbandon)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showFilmsAbandon ? '▼' : '☰'}
        </span>
        Abandonnés
      </h2>
      {showFilmsAbandon && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.movies.filter(movie => movie.status === 'Abandonné').map(film => (
            <WatchlistItem key={film.id} {...film} type ='movie' removeItem={() => removeFromWatchlist(film.id, 'movie')}/>
          ))}
        </div>
      )}
    </section>
  );
}

export default FilmsSection;
