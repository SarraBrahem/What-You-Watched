import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import callApi from '../../../Services/CallApi';
import Card from '../../../components/MoviesTvCard/Card';
import './ItemsList.css';


function ItemsList({ apiPath }) {
  const [items, setItems] = useState([]);
  const elementRef = useRef(null);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resp = await callApi.getCategBaseURL(apiPath);
        const enhancedItems = resp.data.results.map(item => ({
          ...item,
          type: item.release_date ? 'film' : 'series',  // Distinguer films et séries
          detailUrl: `/${item.release_date ? 'films' : 'series'}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`
        }));
        setItems(enhancedItems);
      } catch (err) {
        console.error("Erreur lors de la récupération des données", err);
      }
    };
    fetchItems();
  }, [apiPath]);


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
            <div ref={elementRef} className='flex overflow-x-auto gap-2 md:gap-1.75 scrollbar-hide scroll-smooth py-4 px-3'>
              {items.map((item, index) => {
                return (
                  <div key={index} className='inline-block item-container'>
                    <Link to={item.detailUrl}>
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

export default ItemsList;