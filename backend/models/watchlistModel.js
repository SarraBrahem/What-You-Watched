const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  mediaId: { type: String, required: true },
  mediaType: { type: String, required: true },  // 'movie' or 'series'
  status: { type: String, default: 'Prévu' },
  episodesWatched: { type: Number, default: 0 },
  rating: { type: Number },
  totalEpisodes: { type: Number, default: 1 } // Ajout si besoin, par exemple pour les séries
});

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [mediaItemSchema]
});

module.exports = mongoose.model('Watchlist', watchlistSchema);