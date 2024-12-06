const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Utilisateurs = require('../models/utilisateursModel');
require('dotenv').config();


router.post('/signup', [
    check('nom', 'Le nom est requis').not().isEmpty(),
    check('prenom', 'Le prénom est requis').not().isEmpty(),
    check('username', 'le username est requis').not().isEmpty(),
    check('email', 'Veuillez fournir un email valide').isEmail(),
    check('mot_de_passe', 'Le mot de passe doit comporter au moins 8 caractères').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, mot_de_passe } = req.body;

        let utilisateur = await Utilisateurs.findOne({ email });
        if (utilisateur) {
            return res.status(400).json({ msg: 'Un utilisateur existe déjà avec cet email' });
        }

        const salt = await bcrypt.genSalt(12);
        const motDePasseHash = await bcrypt.hash(mot_de_passe, salt);

        utilisateur = new Utilisateurs({
            nom: req.body.nom,
            prenom: req.body.prenom,
            username: req.body.username,
            email: req.body.email,
            mot_de_passe: motDePasseHash,
            role: 'user'
        });

        await utilisateur.save();

        const payload = {
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                username: utilisateur.username,
                prenom: utilisateur.prenom,
                email: utilisateur.email,
                role: utilisateur.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: '1h' },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erreur lors de la création du token');
                }
                res.status(201).json({ token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur serveur');
    }
});


router.post('/login', [
    check('email', 'Veuillez fournir un email valide').isEmail(),
    check('mot_de_passe', 'Le mot de passe est requis').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, mot_de_passe } = req.body;

    try {
        const utilisateur = await Utilisateurs.findOne({ email });
        if (!utilisateur) {
            return res.status(400).json({ msg: 'Identifiants ou Mot De Passe invalides' });
        }

        const isMatch = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants ou Mot De Passe invalides' });
        }

        const payload = {
            utilisateur: {
                id: utilisateur._id,
                nom: utilisateur.nom,
                prenom: utilisateur.prenom,
                username: utilisateur.username,
                email: utilisateur.email,
                role: utilisateur.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erreur serveur lors de la création du token');
                }
                res.json({ token });
            }
        );
    } catch (error) {
        console.error('Erreur serveur lors de la tentative de connexion:', error.message);
        res.status(500).send('Erreur serveur');
    }
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const utilisateur = await Utilisateurs.findById(decoded.utilisateur.id).select('_id nom prenom username email role');

        if (!utilisateur) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        res.json({ utilisateur });
    } catch (error) {
        console.error('Erreur serveur lors de la récupération du profil:', error.message);
        res.status(500).send('Erreur serveur');
    }
});


module.exports = router;