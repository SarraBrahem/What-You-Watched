const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 50, // limite chaque IP à 100 requêtes par windowMs
    message: 'Trop de requêtes de cette IP, veuillez réessayer après 15 minutes',
});

module.exports = limiter;