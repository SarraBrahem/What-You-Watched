// SeriesList.jsx
import { useEffect, useState } from 'react';
import callApi from '../../../Services/CallApi';
import { Link } from 'react-router-dom';
import Card from './SeriesCard';
import LoadingSpinner from '../../../utiles/LoadingSpinner';

function SeriesList({ genreId }) {
    const [seriesList, setSeriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);  // État pour la page actuelle
    const [totalPages, setTotalPages] = useState(0);    // État pour le nombre total de pages

    useEffect(() => {
      const fetchSeries = async () => {
          try {
              const resp = await callApi.getSeriesById(genreId, currentPage);
              setSeriesList(resp.data.results);
              setTotalPages(10);  // Utiliser la pagination de l'API
          } catch (err) {
              console.error("Erreur lors de la récupération des séries par genre", err);
          }
      };
      fetchSeries();
      setTimeout(() => {
        setIsLoading(false);  // Désactiver l'animation après un délai fictif
      }, 1500);
    }, [genreId, currentPage]);  // Ajouter currentPage comme dépendance pour recharger les données lors du changement de page

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
        setIsLoading(true);
      }
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page smoothly
        setIsLoading(true);
      }
    };

    return (
        <div>
          {isLoading ? <LoadingSpinner /> : 
          <><div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4'>
              {seriesList.map((item, index) => {
                const detailUrl = `series/details/${(item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;
                return (
                  <div key={index} className='inline-block item-container'>
                    <Link to={detailUrl}>
                      <Card series={item} />
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="pagination-controls flex justify-between p-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1} // Désactiver le bouton si on est sur la première page
                className="px-4 py-2 text-white font-bold bg-yellow-500 hover:bg-yellow-800 disabled:bg-gray-500 rounded-l-lg">
                Précédent
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages} // Désactiver le bouton si on est sur la dernière page
                className="px-4 py-2 text-white font-bold bg-yellow-500 hover:bg-yellow-800 disabled:bg-gray-500 rounded-r-lg">
                Suivant
              </button>
            </div></>
          }
        </div>
    );
}

export default SeriesList;