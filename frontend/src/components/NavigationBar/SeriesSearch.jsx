import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import api from '../../Services/CallApi';  // Ensure the path to your API service is correct

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
      if (response.data && Array.isArray(response.data.results)) {  // Ensure there is data and it is an array
        const enhancedResults = response.data.results.map(item => ({
          ...item,
          type: item.media_type === 'movie' ? 'films' : 'series'  // Determine type based on media_type
        }));
        setResults(enhancedResults);
      } else {
        throw new Error('Invalid data structure from API');
      }
    } catch (error) {
      console.error('Error during search:', error);
      setResults([]);  // Reset results on error to avoid faulty data types
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
        className="p-1.5 bg-yellow-700 text-white border-2 border-yellow-900 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:bg-yellow-600 transition-all duration-500 ease-in-out w-full"
      />
      {isExpanded && (
        <button onClick={() => { setExpanded(false); setQuery(''); setResults([]); }} className="absolute right-0 text-2xl text-white mr-4">×</button>
      )}
      <div className={`absolute mt-2 w-80 md:w-full bg-yellow-950 bg-opacity-90 text-white rounded-lg shadow-lg overflow-hidden z-10 top-full ${!isExpanded || results.length === 0 ? 'hidden' : ''}`}>
        {results.length > 0 && (
          <div className="relative z-2 w-full bg-yellow-950 bg-opacity-60 px-3 sm:px-5 py-5 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 sm:gap-4 mt-4 sm:mt-8">
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
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
