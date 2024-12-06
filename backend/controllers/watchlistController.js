// controllers/watchlistController.js
const Watchlist = require('../models/watchlistModel');


exports.addToWatchlist = async (req, res) => {
  const { userId, mediaId, mediaType, status, episodesWatched, rating, totalEpisodes } = req.body;

  try {
    const watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      // Si l'utilisateur n'a pas de watchlist, créez-en une
      const newWatchlist = new Watchlist({
        userId,
        items: [{ mediaId, mediaType, status, episodesWatched, rating, totalEpisodes }]
      });
      await newWatchlist.save();
      return res.status(201).json(newWatchlist);
    }

    // Vérifier si l'élément est déjà dans la watchlist
    const existingItemIndex = watchlist.items.findIndex(item => item.mediaId === mediaId);
    if (existingItemIndex !== -1) {
      return res.status(409).json({ message: 'Cet élément est déjà dans la Watchlist' });
    }

    // Ajouter l'élément à la watchlist existante
    watchlist.items.push({ mediaId, mediaType, status, episodesWatched, rating, totalEpisodes });
    await watchlist.save();
    res.status(200).json(watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.getWatchlistByUserId = async (req, res) => {
  const { userId } = req.params; // Assurez-vous que l'ID de l'utilisateur est transmis comme paramètre dans l'URL

  try {
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      return res.status(404).json({ message: 'Aucune watchlist trouvée pour cet utilisateur' });
    }
    res.status(200).json(watchlist.items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
