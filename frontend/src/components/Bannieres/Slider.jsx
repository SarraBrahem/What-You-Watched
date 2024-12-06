import { useEffect, useRef, useState } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom';
import CallApi from '../../Services/CallApi';

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/original"
const widthSlider = window.innerWidth

export default function Slider() {
  const [itemsList, setItemsList] = useState([]);
  const imageSliderRef = useRef();

  useEffect(() => {
    CallApi.getVideos.then(resp => {
      const enhancedItems = resp.data.results.map(item => ({
        ...item,
        type: item.release_date ? 'film' : 'series'  // Utilisation des champs pour déterminer le type
      }));
      setItemsList(enhancedItems);
    });
  }, []);

  const sliderRight = (el) => {
    el.scrollLeft += widthSlider - 117;
  };

  const sliderLeft = (el) => {
    el.scrollLeft -= widthSlider - 115;
  };

  return (
    <div className='relative'>
      <MdArrowBackIosNew onClick={() => sliderLeft(imageSliderRef.current)} className='hidden md:block text-white text-[25px] absolute mx-8 mt-[225px] cursor-pointer z-50'/>
      <MdArrowForwardIos onClick={() => sliderRight(imageSliderRef.current)} className='hidden md:block text-white text-[25px] absolute mx-8 mt-[225px] font-bold cursor-pointer right-0 z-50'/>
      
      <div className='flex overflow-x-auto w-full px-16 py-4 scroll-smooth' ref={imageSliderRef}>
        {itemsList.map((item, index) => {
          const detailUrl = `/${item.type === 'film' ? 'films' : 'series'}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`;
          return (
            <Link key={index} to={detailUrl} className='inline-block min-w-full mr-5'>
              <div className='relative h-[175px] md:h-[450px] rounded-md hover:border-[5px] border-gray-200 cursor-pointer transition-all'>
                <img className='w-full h-full object-cover object-top hover:brightness-90' src={`${IMAGE_BASE_URL}${item.backdrop_path}`} alt={item.title || item.name} />
                <h2 className='font-semibold text-white text-xl sm:text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] absolute bottom-[1rem] md:bottom-[2rem] left-[1rem] md:left-[2rem]'>
                  {item.title || item.name}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}