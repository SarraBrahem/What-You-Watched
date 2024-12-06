import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/CallApi';  // Vérifie que le chemin vers ton fichier API est correct
import "./Bienvenue.css";

export default function Bienvenue() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    <section className="relative" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}>
      <div className="py-8 px-4 lg:p-12 lg:px-4 mx-auto max-w-screen-xl text-center md:text-start">
        <div className="absolute inset-0 bg-black z-0 opacity-60"></div>
        <h1 className='relative text-4xl sm:text-5xl text-white font-bold mb-1'>Bienvenue,</h1>
        <h2 className='relative text-lg sm:text-2xl md:text-3xl text-white font-semibold'>Découvrez des millions de films, séries et acteurs...</h2>
        <div className="pt-6 pb-4 w-full">
          <div className="overflow-hidden z-0 rounded-full relative p-2">
            <form role="form" className="relative flex z-50 bg-white rounded-full" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Rechercher un film, une série, un acteur..." 
                className="rounded-full text-xs md:text-base flex-1 px-4 md:px-6 py-4 text-gray-700 focus:outline-none" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
              />
              <button type="submit" className="hidden sm:flex bg-gray-500 text-white rounded-full font-semibold px-8 py-4 hover:bg-indigo-400 focus:bg-gray-600 focus:outline-none">Rechercher</button>
              <button type="submit" className="flex sm:hidden bg-gray-500 text-white rounded-full font-semibold px-7 py-4 hover:bg-indigo-400 focus:bg-gray-600 focus:outline-none">
                <svg className="w-[20px] h-[25px] fill-[#ffffff]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                </svg>
              </button>
            </form>
            <div class="glow glow-1 z-10 bg-indigo-700 absolute"></div>
            <div class="glow glow-2 z-20 bg-blue-600 absolute"></div>
            <div class="glow glow-3 z-30 bg-gray-400 absolute"></div>
            <div class="glow glow-4 z-40 bg-black absolute"></div>
          </div>
        </div>
        {/* Affichage des résultats ici */}
        {results.length > 0 && (
          <div className="relative z-2 w-full bg-black px-3 sm:px-5 py-5 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-4 rounded-xl">
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
    </section>
  );
}