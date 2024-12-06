import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';

const SelectionQCM = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-700 to-blue-400 text-white">
        <h2 className="text-4xl sm:text-5xl font-bold mb-14 -mt-36">Préférez-vous regarder un film ou une série?</h2>
        <button 
          onClick={() => navigate('/qcm/films') } 
          className="bg-white border-4 text-red-700 text-2xl font-bold py-6 px-32 rounded-xl mb-6 hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out">
          FILM
        </button>
        <button 
          onClick={() => navigate('/qcm/series')} 
          className="bg-white border-4 text-yellow-600 text-2xl font-bold py-6 px-32 rounded-xl hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out">
          SERIE
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default SelectionQCM;
