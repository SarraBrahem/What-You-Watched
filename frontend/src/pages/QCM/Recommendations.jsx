import React from 'react';
import { Link } from 'react-router-dom';

const Recommendations = ({ items, type }) => {
  if (type === 'films') {
    type = 'movie';
  }
  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-950 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => {
            const detailUrl = `/${type}/detail/${(item.title).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;

            return (
              <Link to={detailUrl} className="block">
                <div key={item.id} className="m-4 border-2 border-white rounded-lg overflow-hidden shadow-lg shadow-white transform transition duration-300 hover:scale-105">
                  <img src={item.poster} alt={item.title} className="w-full" />
                  <div className="p-2 text-center text-white font-semibold">
                    {item.title}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
