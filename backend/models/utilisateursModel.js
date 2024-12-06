const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmWatchlistSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'film'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, { _id: false });

const serieWatchlistSchema = new Schema({
    tmdbId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: 'serie'
    },
    saison: {
        type: Number,
        required: true
    },
    episode: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, { _id: false });

const watchlistSchema = new Schema({
  userId: { type: String, required: true },
  mediaId: { type: String, required: true },
  mediaType: { type: String, required: true },
  status: { type: String, default: 'Prévu' },
  episodesWatched: { type: Number, default: 0 },
  rating: { type: Number }
});


const utilisateurSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est obligatoire']
    },
    username: {
      type: String,
      required: [true, 'Le username est obligatoire']
  },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
    },
    mot_de_passe: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    Watchlist: [watchlistSchema]
}, { timestamps: true });

utilisateurSchema.index({ email: 1 });


const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);
module.exports = Utilisateur;