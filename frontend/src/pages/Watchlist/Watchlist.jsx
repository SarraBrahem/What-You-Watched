import React, { useState } from 'react';
import Header from "../../components/Header/WatchListHeader";
import Footer from "../../components/Footer/Footer";
import FilmsSection from './FilmsSection';
import SeriesSection from './SeriesSection';


function Watchlist() {
    const [activeList, setActiveList] = useState('films');

    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <div className=' bg-gradient-to-r from-red-700 to-yellow-500 text-center py-4 font-bold text-4xl text-white'>
          <h1>MA WATCHLIST</h1>
        </div>
        <div className="flex justify-center border-b-2 border-black font-bold bg-black my-4">
        <button
          className={` w-1/4 px-4 py-2 rounded-l-lg ${activeList === 'films' ? 'bg-gradient-to-r from-red-600 to-red-900 text-white brightness-125' : 'bg-black text-white border-4 border-red-600'}`}
          onClick={() => setActiveList('films')}
        >
          FILMS
        </button>
        <button
          className={`w-1/4 px-4 py-2 rounded-r-lg ${activeList === 'series' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-4 border-yellow-500' : 'bg-black text-white border-4 border-yellow-500'}`}
          onClick={() => setActiveList('series')}
        >
          SERIES
        </button>
      </div>
      <main className="flex-grow">
        {activeList === 'films' ? <FilmsSection /> : <SeriesSection />}
      </main>
      <div className='bg-white'>
        <Footer />
      </div>
    </div>
  );
}

export default Watchlist;