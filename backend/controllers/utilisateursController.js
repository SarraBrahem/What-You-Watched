const mongoose = require('mongoose');
const Utilisateur = require('../models/utilisateursModel');
const bcrypt = require('bcryptjs');

const obtenirUtilisateurs = async(req, res) => {
    try {
        const utilisateurs = await Utilisateur.find({}).sort({ createdAt: -1 });
        res.status(200).json(utilisateurs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenirUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findById(id).select("-mot_de_passe");

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenirNometPrenom = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findById(id).select("nom prenom");

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const supprimerUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndDelete({ _id: id });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const majUtilisateur = async(req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, {...req.body }, { new: true });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const majmot_de_passe = async(req, res) => {
    const { id } = req.params;
    const { mot_de_passe } = req.body;

    try {
        
        if (!mot_de_passe) {
            return res.status(400).json({ error: "Veuillez saisir un mot de passe" });
        }

        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(!mot_de_passe.match(passw)){
            return res.status(400).json({ error: "Le mot de passe doit contenir des majuscules, des minuscules et doit être plus long que 8 caractères." });
        }
        const salt = await bcrypt.genSalt(12);
        const motDePasseHash = await bcrypt.hash(mot_de_passe, salt);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "id invalid" });
        }

        const utilisateur = await Utilisateur.findOneAndUpdate({ _id: id }, { mot_de_passe:motDePasseHash });

        if (!utilisateur) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenirUtilisateurs,
    supprimerUtilisateur,
    obtenirUtilisateur,
    majUtilisateur,
    majmot_de_passe,
    obtenirNometPrenom
};