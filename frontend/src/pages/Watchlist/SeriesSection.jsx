import React, { useState } from 'react';
import WatchlistItem from './Items';
import { useWatchlist } from './WatchlistContext'; // Assurez-vous que le chemin est correct

function SeriesSection() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [showSeriesEnCours, setShowSeriesEnCours] = useState(true);
  const [showSeriesTermines, setShowSeriesTermines] = useState(false);
  const [showSeriesPrevu, setShowSeriesPrevu] = useState(true);
  const [showSeriesEnPause, setShowSeriesEnPause] = useState(false);
  const [showSeriesAbandonnes, setShowSeriesAbandonnes] = useState(false);


  return (
    <section id="series" className="p-4">
      {/* Section "En Cours" */}
      <h2 className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesEnCours(!showSeriesEnCours)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesEnCours ? '▼' : '☰'}
        </span>
        En Cours
      </h2>
      {showSeriesEnCours && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.series.filter(serie => serie.status === 'En Cours').map(serie => (
            <WatchlistItem key={serie.id} {...serie} type='series' removeItem={() => removeFromWatchlist(serie.id, 'series')} />
          ))}
        </div>
      )}

      {/* Section "Terminés" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesTermines(!showSeriesTermines)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesTermines ? '▼' : '☰'}
        </span>
        Terminés
      </h2>
      {showSeriesTermines && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.series.filter(serie => serie.status === 'Terminé').map(serie => (
            <WatchlistItem key={serie.id} {...serie} type='series' removeItem={() => removeFromWatchlist(serie.id, 'series')} />
          ))}
        </div>
      )}

      {/* Section "En Pause" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesEnPause(!showSeriesEnPause)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesEnPause ? '▼' : '☰'}
        </span>
        En Pause
      </h2>
      {showSeriesEnPause && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.series.filter(serie => serie.status === 'En Pause').map(serie => (
            <WatchlistItem key={serie.id} {...serie} type='series' removeItem={() => removeFromWatchlist(serie.id, 'series')} />
          ))}
        </div>
      )}

      {/* Section "Abandonnés" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesAbandonnes(!showSeriesAbandonnes)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesAbandonnes ? '▼' : '☰'}
        </span>
        Abandonnés
      </h2>
      {showSeriesAbandonnes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.series.filter(serie => serie.status === 'Abandonné').map(serie => (
            <WatchlistItem key={serie.id} {...serie} type='series' removeItem={() => removeFromWatchlist(serie.id, 'series')} />
          ))}
        </div>
      )}

      {/* Section "Prévu" */}
      <h2 className="bg-black text-white text-xl font-semibold mb-4 border-4 border-yellow-500 p-1 rounded-md pl-4" onClick={() => setShowSeriesPrevu(!showSeriesPrevu)}>
        <span className="mr-4 text-xl text-white font-bold">
          {showSeriesPrevu ? '▼' : '☰'}
        </span>
        Prévus
      </h2>
      {showSeriesPrevu && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.series.filter(serie => serie.status === 'Prévu').map(serie => (
            <WatchlistItem key={serie.id} {...serie} type='series' removeItem={() => removeFromWatchlist(serie.id, 'series')} />
          ))}
        </div>
      )}
    </section>
  );
}

export default SeriesSection;
