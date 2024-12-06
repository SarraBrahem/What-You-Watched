import React from 'react';
import CategoriesList from './CategoriesList';
import MovieList from './MovieList';

function Affichage() {
  return (
    <div>
      {CategoriesList.genere.map((item, index) => (
        <div key={index} className='p-3 sm:p-8 px-4 md:px-16'>
          <h2 className='text-lg sm:text-2xl text-white font-bold'>{item.name}</h2>
          <MovieList apiPath={item.api} sort={item.sort} />
        </div>
      ))}
    </div>
  );
}

export default Affichage;