import React from 'react';
import { Link } from 'react-router-dom';

const createSlug = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

function WatchlistItem({ id, title, watchedEpisodes, totalEpisodes, rating, poster, type, removeItem }) {
  const slug = createSlug(title);
  const detailUrl = type === 'movie' ? `/films/details/${slug}/${id}` : `/series/details/${slug}/${id}`;
  const episodeInfo = `${watchedEpisodes}/${totalEpisodes} épisode${totalEpisodes > 1 ? 's' : ''}`;


  return (
    <div className="bg-black text-white border-2 rounded-lg flex mb-4 overflow-hidden">
      <Link to={detailUrl} className="flex-grow flex">
        <img src={poster} alt="Poster" className="w-32 h-44 md:w-40 md:h-56 rounded-l-md"/>
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <p className="text-lg md:text-xl font-bold">{title}</p>
            <p className="text-sm">{episodeInfo}</p>
          </div>
          <div className="mt-auto"> {/* This ensures that the rating is pushed to the bottom */}
            {rating ? (
              <p className="flex items-center text-white">
                <span className="text-yellow-500 mr-1 md:-mt-1 text-2xl md:text-3xl">★</span>
                {`${rating}/10`}
              </p>
            ) : (
              <p className="flex items-center text-white">
                <span className="mr-1 md:-mt-1 text-2xl md:text-3xl">★</span>
                -
              </p>
            )}
          </div>
        </div>
      </Link>
      <button onClick={removeItem} className="bg-white hover:bg-gray-400 text-black font-bold px-1.5 rounded-br-md rounded-tr-md">
        X
      </button>
    </div>
  );
}

export default WatchlistItem;
