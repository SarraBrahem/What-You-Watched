const IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500";

function SeriesCard({series}) {
  return (
    <section className='hover:scale-105 transition-all duration-150 ease-in'>
    <img src={`${IMAGE_BASE_URL}${series.poster_path}`} 
    className='w-48 md:w-56 md:h-76 rounded-lg hover:border-[3px] border-gray-400 cursor-pointer'/>
    <h2 className='w-44 md:w-52 text-white font-semibold mt-2'>{series.name}</h2>
    </section>
  )
}

export default SeriesCard