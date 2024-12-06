const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send("Un token est requis pour l'accès.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Token invalide.");
    }
};

const adminOnly = (req, res, next) => {
    console.log(req.user);

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send("Accès refusé. Réservé aux administrateurs.");
    }
};

const userOnly = (req, res, next) => {
    if (req.user && req.user.id === req.params.id) {
        next();
    } else {
        res.status(403).send("Accès refusé. Réservé à l'utilisateur concerné.");
    }
};

module.exports = {
    verifyToken,
    adminOnly,
    userOnly
};