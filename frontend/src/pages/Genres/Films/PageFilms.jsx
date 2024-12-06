import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/MovieHeader";
import Footer from "../../../components/Footer/Footer";
import MovieList from "./MovieList";
import GenresList from './GenresList';
import LoadingSpinner from "../../../utiles/LoadingSpinner"

const categories = [...GenresList.genere.map(g => g.name)];

function FilmsPage2() {
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
    navigate(`/films/${category}`);
    setIsLoading(true);  // Réactiver l'animation de chargement lors du changement de catégorie
  };
  
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-red-700">
          <Header />
        </div>
        <div className="flex-grow">
          <section className="bg-red-700">
            <div className="container mx-auto py-6">
              <div className="ml-4 md:ml-16">
              <h1 className="text-white text-3xl font-bold">Films</h1>
              <div className="flex overflow-x-auto py-4 space-x-4" style={{scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-500 ${activeCategory === category ? "bg-red-500" : "bg-red-700"}`}
                    onClick={() => handleCategoryChange(category)}
                    style={{whiteSpace: 'nowrap'}}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="">
                {/* Afficher les Films ici après le chargement */}
                <p className="bg-red-900 py-2 pl-5 text-white text-lg sm:text-3xl font-bold">Films de la catégorie : {activeCategory}</p>
                {isLoading ? <LoadingSpinner /> : <MovieList genreId={GenresList.genere.find(g => g.name === activeCategory)?.id} />}
              </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

export default FilmsPage2;