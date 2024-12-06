require('dotenv').config();

// const https = require('https'); // Commenté pour désactiver HTTPS
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./utils/rateLimit');
// const errorHandler = require('./middleware/errorMiddleware');
// const verifyToken = require('./middleware/authMiddleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const utilisateursRoutes = require('./routes/utilisateurs');
const filmsRoutes = require('./routes/films');
const acteursRoutes = require('./routes/acteurs');
const seriesRoutes = require('./routes/series');
const authRoutes = require('./routes/authRoutes');
const commentairesRoutes = require('./routes/commentairesRoutes');
const app = express();
const questionsRoutes = require('./routes/questions');


app.use(helmet());
app.use(cors({
    origin: ["https://what-you-watched.vercel.app", "https://what-you-watched-backend.vercel.app", "https://localhost:3000", "https://localhost:4000", "http://localhost:3000", "http://localhost:4000"],
    methods: ["POST", "GET", "PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
}));

// Limite le taux de requêtes pour prévenir les attaques DDoS ou de force brute
app.use(rateLimit);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello");
});
// Routes
app.use('/api/authRoutes', authRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/films', filmsRoutes);
app.use('/api/acteurs', acteursRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/commentaires', commentairesRoutes);
app.use('/api/questions', questionsRoutes);


// Integration de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connexion à MongoDB et démarrage du serveur
mongoose.connect(process.env.DBURI)
    .then(() => {

        // Utilisation de HTTP plutôt que HTTPS pour le moment
        app.listen(process.env.PORT || 4000, () => {
            console.log(`HTTP Server running on port ${process.env.PORT || 4000}`);
        });
    })
    .catch((err) => { console.error(err); });