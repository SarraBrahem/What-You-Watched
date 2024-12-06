import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Header from '../../../components/Header/MovieHeader';
import Footer from '../../../components/Footer/Footer';
import Slider from '../../../components/Bannieres/SliderMovie';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Affichage from './Categories/Affichage';



// Genre Banner Component
const GenreBanner = ({ genre }) => (
  <Link to={`/films/${genre.name}`} className="inline-block item-container cursor-pointer rounded-lg mr-3 md:mr-6 mb-2 mt-3 bg-red-800 hover:bg-red-900 text-white">
    <img src={genre.image} alt={genre.name} className='rounded-lg shadow-xl w-[170px] h-[110px] md:w-[260px] md:h-[150px] object-cover border-2 border-white hover:brightness-75 hover:scale-105 transition-all duration-300'/>
  </Link>
);

const MovieHomePage = () => {

  // Base de données des genres
  const genres = [
    { name: "Action", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Action.png` },
    { name: "Comédie", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Comedie.png` },
    { name: "Science-Fiction", image: `${process.env.PUBLIC_URL}/images/Genres/Films/S-FX.png` },
    { name: "Émotion", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Emotion.png` },
    { name: "Policier", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Policier.png` },
    { name: "Animation", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Animation.png` },
    { name: "Horreur", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Horreur.png` },
    { name: "Suspense", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Suspense.png` },
    { name: "Jeunesse", image: `${process.env.PUBLIC_URL}/images/Genres/Films/Jeunesse.png` },
  ];

  const scrollContainerRef = React.useRef(null);

  const scrollGenres = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollBy = direction === 'left' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollBy, behavior: 'smooth' });
    }
  };


  {/*AFFICHAGE DE LA PAGE WEB*/}
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-700">
        <Header />
      </div>
      <div className="flex-grow bg-red-700">
        <section className="bg-gradient-to-b from-red-700 to-red-950">
          <div className='mb-6 bg-red-700'>
            <h1 className="text-white text-3xl font-semibold mx-12 mb-2 mt-8 ml-8 md:ml-20">Films</h1>
            {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DE LA BANNIERE*/}
            <Slider />
          </div>

          {/*LOGIQUE IMPLEMENTER POUR L'AFFICHAGE DES GENRES*/}
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <FaArrowAltCircleLeft onClick={() => scrollGenres('left')} className="hidden md:block text-3xl text-white cursor-pointer hover:opacity-75" />
              <div ref={scrollContainerRef} className="flex overflow-x-auto scrollbar-hide scroll-smooth px-3">
                {genres.map((genre, index) => (
                  <GenreBanner key={index} genre={genre} />
                ))}
              </div>
              <FaArrowAltCircleRight onClick={() => scrollGenres('right')} className="hidden md:block text-3xl text-white cursor-pointer hover:opacity-75" />
            </div>
          </div>
          <Affichage />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MovieHomePage;