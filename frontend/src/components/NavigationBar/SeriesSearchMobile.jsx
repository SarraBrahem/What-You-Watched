import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../../Services/CallApi';

const SearchComponentMobile = () => {
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
    <div className="flex flex-col items-center relative">
      <input
        type="text"
        placeholder="Recherchez..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-1.5 bg-yellow-700 text-white border-2 border-yellow-900 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-600 w-40"
      />
      <div className={`absolute z-10 top-full mt-1.5 w-[230px] bg-yellow-900 text-white rounded-lg shadow-md shadow-black overflow-y-auto max-h-[350px]  ${results.length === 0 ? 'hidden' : ''}`}>
        <div className="py-2 px-1">
        {results.map(item => {
          const detailUrl = `/${item.type}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;
          return (
            <Link key={item.id} to={detailUrl} className="flex items-center text-white mb-1 min-w-[225px] shadow-inner shadow-stone-700 rounded-lg hover:bg-black-800 transition-colors duration-300">
              <img 
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://www.movienewz.com/img/films/poster-holder.jpg"} 
                alt={item.title || item.name}
                className="w-16 h-auto object-cover mr-3 rounded-sm"
              />
              <div>
                <h3 className="text-sm">{item.title || item.name}</h3>
                <p className="text-xs text-white opacity-75 mt-1">{item.abbreviations}</p> {/* Assumant que `abbreviations` est la propriété contenant les abréviations */}
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default SearchComponentMobile;
