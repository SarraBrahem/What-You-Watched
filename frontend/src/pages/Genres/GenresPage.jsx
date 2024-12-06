import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const GenrePage = () => {
  const { genreId } = useParams();
  const [content, setContent] = useState([]);
  const [genreName, setGenreName] = useState('');
  const api_key = "433cffe8b54a391f4a13ca5bc5baa0d0";

  useEffect(() => {
    const fetchGenreName = async () => {
      const genreResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`);
      const genreData = await genreResponse.json();
      const matchedGenre = genreData.genres.find(genre => genre.id.toString() === genreId);
      if (matchedGenre) {
        setGenreName(matchedGenre.name);
      }
    };

    const fetchContentByGenre = async () => {
      const urls = [
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`,
        `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`
      ];
      const responses = await Promise.all(urls.map(url => fetch(url)));
      const data = await Promise.all(responses.map(res => res.json()));
      const combinedContent = data.flatMap(item => item.results);
      combinedContent.sort(() => 0.5 - Math.random());
      setContent(combinedContent);
    };

    fetchGenreName();
    fetchContentByGenre();
  }, [genreId, api_key]);

  return (
    <div className="bg-gradient-to-b from-green-700 to-green-950 py-8">
      <Link to="/" className="flex items-center justify-center mb-3 -mt-4">
        <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} alt="Logo" className="h-32 shadow-sm rounded-full shadow-white" />
      </Link>
      <h1 className='flex flex-auto justify-center text-white py-6 font-bold text-xl md:text-3xl border-x-8 border-b-8 rounded-full'>Bienvenue dans le coin : {genreName.toUpperCase()}</h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {content.map((item) => {
            const detailUrl = `/${item.release_date ? 'films' : 'series'}/details/${(item.title || item.name).toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}/${item.id}`
            return (
              <Link key={item.id} to={detailUrl} className="block transform transition duration-300 hover:scale-105">
                <div className="m-4 border-2 border-white rounded-lg overflow-hidden shadow-lg shadow-white">
                  <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title || item.name} className="w-full"/>
                  <div className="p-2 text-center text-white font-semibold">
                    {item.title || item.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
