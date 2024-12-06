import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const RecommendationsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { items, type } = location.state || {};
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await axios.get(`/api/questions/${type}/detail/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    }
    if (id) {
      fetchDetails();
    }
  }, [id, type]);

  return (
    <div>
      <Header />
      {id ? (
        details && (
          <div className="flex flex-col items-center justify-center h-screen text-white">
            <img src={`https://image.tmdb.org/t/p/original${details.poster_path}`} className='w-36 -mt-10 sm:w-44 mb-4' alt={details.title || details.name} />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{details.title || details.name}</h2>
            <p className="flex text-center text-lg sm:text-xl mb-8 px-2">{details.overview}</p>
          </div>
        )
      ) : (
        <div className="bg-gradient-to-b from-blue-700 to-blue-950 py-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item) => {
                // when the type is series we need to change item.title to item.name
                const detailUrl = `/${type}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;



                return (
                  <a href={detailUrl} key={item.id} className="block">
                    <div className="m-4 border-2 border-white rounded-lg overflow-hidden shadow-lg shadow-white transform transition duration-300 hover:scale-105">
                      <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title || item.name} className="w-full" />
                      <div className="p-2 text-center text-white font-semibold">
                        {item.title || item.name}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RecommendationsPage;
