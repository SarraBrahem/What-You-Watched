import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../../Services/CallApi';

const SearchComponent = ({ isExpanded, setExpanded }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
    } else if (query.length > 2) {
      fetchData(query);
    }
  }, [query]);

  const fetchData = async (query) => {
    try {
      const response = await api.searchMulti(query);
      const enhancedResults = response.data.results.map(item => ({
        ...item,
        type: item.media_type === 'movie' ? 'films' : 'series'  // Détermine le type basé sur media_type
      }));
      setResults(enhancedResults);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
    }
  };

  return (
    <div className={`flex items-center transition-all duration-500 ease-in-out ${isExpanded ? 'w-full' : 'w-68'} relative mr-10`}>
      <input
        type="text"
        placeholder="Recherchez..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setExpanded(true)}
        className="p-1.5 bg-gradient-to-b from-blue-900 to-blue-700  text-white border-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 hover:bg-indigo-700-600 transition-all duration-500 ease-in-out w-full"
      />
      {isExpanded && (
        <button onClick={() => { setExpanded(false); setResults([]); }} className="absolute right-0 text-2xl text-white mr-4">×</button>
      )}
      <div className={`absolute mt-2 w-80 md:w-full bg-blue-900 bg-opacity-90 text-white rounded-lg shadow-lg overflow-hidden z-10 top-full ${!isExpanded || results.length === 0 ? 'hidden' : ''}`}>
        <div className="relative z-2 w-full bg-gradient-to-b from-blue-900 to-gray-950 bg-opacity-60 px-3 sm:px-5 py-5 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 sm:gap-4 mt-4 sm:mt-8">
          {results.map(item => {
            const detailUrl = `/${item.type}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;
            return (
              <Link key={item.id} to={detailUrl} className="text-center flex flex-col items-center bg-opacity-80 hover:scale-105 transition-transform duration-300 w-full">
                <img 
                  src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://www.movienewz.com/img/films/poster-holder.jpg"} 
                  alt={item.title || item.name} 
                  className="w-full h-auto object-cover rounded-md"
                />
                <h3 className="text-white text-base mt-2">{item.title || item.name}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;