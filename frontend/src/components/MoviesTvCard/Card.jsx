
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

function MovieCard({movie}) {
  
  return (
    <>
        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
        className='w-44 sm:w-52 md:w-64 rounded-lg hover:border-[3px] border-gray-400 cursor-pointer hover:scale-105 transition-all duration-150 ease-in'/>
    </>
  )
}

export default MovieCard