import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import callApi from '../../../../Services/CallApi';
import Card from '../../../../components/MoviesTvCard/Card';


function MovieList({ apiPath, sort }) {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const resp = await callApi.getMovieTVBaseURL(apiPath, sort);
          setMovieList(resp.data.results);
        } catch (err) {
            console.error("Erreur lors de la récupération des séries par genre", err);
        }
      }
      fetchMovies();
    }, [apiPath, sort]);

    const slideRight = (element) => {
        element.scrollLeft += 1400;
    };
    const slideLeft = (element) => {
        element.scrollLeft -= 1395;
    };

    return (
        <div className='relative'>
            <IoChevronBackOutline onClick={() => slideLeft(elementRef.current)}
                className={`text-[50px] text-white p-2 z-20 cursor-pointer hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2`}
            />
            <div ref={elementRef} className='flex overflow-x-auto gap-2 md:gap-2.5 scrollbar-hide scroll-smooth pt-4 px-3 pb-4'>
              {movieList.map((item, index) => {
                const detailUrl = `details/${(item.title).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;
                return (
                  <div key={index} className='inline-block item-container'>
                    <Link to={detailUrl}>
                      <Card movie={item} />
                    </Link>
                  </div>
                );
              })}
            </div>
            <IoChevronForwardOutline onClick={() => slideRight(elementRef.current)}
                className={`text-[50px] text-white p-2 z-20 cursor-pointer hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2`}
            />
        </div>
    );
}

export default MovieList;