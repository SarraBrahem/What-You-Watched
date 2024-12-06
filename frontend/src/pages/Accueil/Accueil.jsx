import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../styles.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Bienvenue from '../../components/Bannieres/Bienvenue';
import Slider from '../../components/Bannieres/Slider';
import Affichage from './Categories/Affichage';
import CustomScrollBarS from '../../utiles/CustomScrollBar.css';

// Pour chaque genre, utilisez Link pour naviguer
const GenreBanner = ({ genre }) => (
  <Link to={`/genre/${genre.id}`} className="inline-block cursor-pointer mr-4 mb-2 mt-3 rounded-xl bg-gray-800 hover:bg-white text-white relative">
    <img src={genre.image} alt={genre.name} className='brightness-50 rounded-lg shadow-lg w-[220px] h-[150px] object-cover border-2 border-white hover:brightness-75'/>
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-white text-2xl">{genre.name}</p>
    </div>
  </Link>
);


function Accueil() {

  // Base de données des genres
  const genres = [
    { name: "Action", image: "https://images-3.rakuten.tv/storage/snapshot/shot/1d6c33e4-e71f-4338-94f9-88b86900a911-snapshot-1590662744-width936-quality90.jpeg", id: 28 },
    { name: "Comédie", image: "https://www.programme-tv.net/imgre/fit/~1~tel~2023~08~02~509b09f4-c91d-426f-a656-68f52680f232.jpeg/1200x600/crop-from/top/quality/80/case-depart-ces-scenes-inspirees-de-l-epoque-coloniale-particulierement-difficiles-a-jouer-pour-thomas-ngijol-et-fabrice-eboue.jpg", id: 35 },
    { name: "Science-Fiction", image: "https://leclaireur.fnac.com/wp-content/uploads/2023/12/iron-man.jpg", id: 878 },
    { name: "Drame", image: "https://assetsio.gnwcdn.com/squid-game-board-game-artwork.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp", id: 18 },
    { name: "Crime", image: "https://i.f1g.fr/media/cms/orig/2020/09/02/04a003d94a549d900c75d6b7d325279771f3a020944d55bdf29b2cbae95e27a8.jpeg", id: 80 },
    { name: "Animation", image: "https://images.rtl.fr/~c/1200v800/rtl/www/1245070-muphasa-et-simba-dans-le-roi-lion.jpg", id: 16 },
    { name: "Horreur", image: "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dw924fcce3/fanzone/dossier/ca/ca-clown.jpg", id: 27 },
    { name: "Mystère", image: "https://media.vanityfair.fr/photos/6127abf261d8f6d5e24e60dd/16:9/w_2560%2Cc_limit/Netflix%2520:%2520courtesy%2520Everett%2520Collection4.jpg", id:9648 },
    { name: "Famille", image: "https://static.bandainamcoent.eu/high/paw-patrol/paw-patrol-world/00-page-setup/PPW-mobile-header.jpg", id: 10751 },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative z-100">
        <Header />
        <Bienvenue />
      </div>
      <div className="bg-gradient-to-b from-black to-indigo-950 border-t-2 border-gray-600">         
        <h1 className="text-white text-2xl sm:text-3xl font-bold mb-0 mt-4 ml-6 sm:ml-16">Nouveautés</h1>
        <Slider />
      </div>
      <section className="flex-grow bg-gradient-to-b from-indigo-950 to-blue-800">
        <Affichage />
      </section>
      <div className="bg-gray-500 border-t-2">
        <div className="text-white text-4xl font-bold mt-10 mb-4 ml-6 sm:ml-20"> Parcourir par genre
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10 mb-8 text-center justify-center">
            {genres.map((genre, index) => (
            <GenreBanner key={index} genre={genre} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Accueil;