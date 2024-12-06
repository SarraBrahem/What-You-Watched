import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../components/Header/QcmHeader';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/qcm-selection');
  };

  return (
    <div className="">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-700 to-blue-400 text-white">
        <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} alt="Logo" className="w-44 h-auto mb-8 -mt-52 sm:-mt-20"/>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">Bienvenue sur Notre QCM !</h1>
        <p className="flex text-center text-lg mb-8 px-4">Découvrez les films et séries qui vous correspondent le mieux.</p>
        <button onClick={handleStartClick} className="bg-white border-2 text-blue-700 font-bold py-2 px-4 rounded
          hover:bg-blue-900 hover:text-white transition duration-200 ease-in-out " aria-label="Commencer le questionnaire">
          Commencez
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
