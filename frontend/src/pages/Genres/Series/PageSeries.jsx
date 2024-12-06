import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/SeriesHeader";
import Footer from "../../../components/Footer/Footer";
import SeriesList from "./SeriesList";
import GenresList from './GenresList';
import LoadingSpinner from "../../../utiles/LoadingSpinner"

const categories = [...GenresList.genere.map(g => g.name)];

function Series() {
  const { genre } = useParams();
  const [activeCategory, setActiveCategory] = useState(genre);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveCategory(genre);
    setIsLoading(true);  // Activer l'animation de chargement
    setTimeout(() => {
      setIsLoading(false);  // Désactiver l'animation après un délai fictif
    }, 1500);
  }, [genre]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    navigate(`/series/${category}`);
    setIsLoading(true);  // Réactiver l'animation de chargement lors du changement de catégorie
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-yellow-600">
        <Header />
      </div>
      <div className="flex-grow">
        <section className="bg-yellow-600">
          <div className="container mx-auto py-6">
            <div className="ml-4 md:ml-16">
            <h1 className="text-white text-3xl font-bold">Séries</h1>
            <div className="flex overflow-x-auto py-4 space-x-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`text-white font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 ${activeCategory === category ? "bg-yellow-500" : "bg-yellow-600"}`}
                  onClick={() => handleCategoryChange(category)}
                  style={{whiteSpace: 'nowrap'}}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="">
              {/* Afficher les Séries ici après le chargement */}
              <p className="bg-yellow-900 py-2 pl-5 text-white text-lg sm:text-3xl font-bold">Séries de la catégorie : {activeCategory}</p>
              {isLoading ? <LoadingSpinner /> : <SeriesList genreId={GenresList.genere.find(g => g.name === activeCategory)?.id} />}
            </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Series;