const genere= [
  {
    "api": "tv/top_rated",
    "name": "Les Mieux Notées"
  },
  {
    "api": "trending/tv/day",
    "name": "Tendances De La Semaine"
  },
  {
    "api": "discover/tv",
    "sort": "first_air_date.gte=2024-01-01&sort_by=popularity.desc&with_origin_country=JP",
    "name": "Itadakimasu ! (Animes 2024) "
  },
  {
    "api": "discover/tv",
    "sort": "sort_by=vote_count.desc",
    "name": "Les Eternels BANGERS"
  },
  {
    "api": "discover/tv",
    "sort": "first_air_date.gte=2023-01-01&first_air_date.lte=2023-12-31&sort_by=popularity.desc&with_origin_country=US",
    "name": "Les Pépites De 2023"
  },
  {
    "api": "discover/tv",
    "sort": "first_air_date.gte=2020-01-01&sort_by=popularity.desc&with_genres=18&with_origin_country=TR",
    "name": "Seni Seviyorum"
  },
  {
    "api": "discover/tv",
    "sort": "sort_by=vote_count.desc&with_origin_country=KR",
    "name": "Une Promenade A Seoul ?"
  },
  {
    "api": "discover/tv",
    "sort": "sort_by=popularity.desc",
    "name": "Spécial Télévision"
  },
  {
    "api": "discover/tv",
    "sort": "first_air_date.gte=2024-05-20&sort_by=popularity.desc",
    "name": "Les Prochaines Sorties"
  },
]

export default{
  genere
}