const genere= [
  {
    "api": "discover/movie",
    "sort": "sort_by=popularity.desc&year=2024",
    "name": "Les Plus Vus Cette Année"
  },
  {
    "api": "trending/movie/day",
    "name": "Actuellement au cinéma"
  },
  {
    "api": "movie/upcoming",
    "name": "Les Dernières Sorties"
  },
  {
    "api": "discover/movie",
    "sort": "sort_by=revenue.desc",
    "name": "Box-Office"
  },
  {
    "api": "discover/movie",
    "sort": "sort_by=popularity.desc&year=2023",
    "name": "Les Plus Vus L'Année Dernière"
  },
  {
    "api": "movie/top_rated",
    "name": "Ils Ont Traversés Les Époques..."
  },
  {
    "api": "discover/movie",
    "sort": "primary_release_date.gte=2024-04-21&sort_by=popularity.desc",
    "name": "Prochainement au cinéma"
  },
]

export default{
  genere
}