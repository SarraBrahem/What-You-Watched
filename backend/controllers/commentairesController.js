const mongoose = require('mongoose');
const Commentaire = require('../models/commentairesModel');
const Utilisateur = require('../models/utilisateursModel');
const axios = require('axios');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.TMDBAPIKEY
    }
};

const validatemediaID = async (idmedia) => {
    const urlmv = 'https://api.themoviedb.org/3/movie/' + idmedia;
    const urltv = 'https://api.themoviedb.org/3/tv/' + idmedia;

    try {
        await axios.get(urlmv, options);
        return true;
    } catch (error) {
        try {
            await axios.get(urltv, options);
            return true;
        } catch (error) {
            return false;
        }
    }

}

const ajouterCommentaire = async (req, res) => {

    const { contenu, idutilisateur, idmedia } = req.body;

    // sanitization
    if (!contenu || !idutilisateur || !idmedia) {
        return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    } else if (contenu.length < 5) {
        return res.status(400).json({ error: "Le contenu du commentaire doit contenir au moins 5 caractères" });
    } else if (contenu.length > 500) {
        return res.status(400).json({ error: "Le contenu du commentaire doit contenir au maximum 500 caractères" });
    } else if (!mongoose.Types.ObjectId.isValid(idutilisateur)) {
        return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
    } else if (!typeof idmedia === 'String' || idmedia < 1) {
        return res.status(400).json({ error: "l'id du media n'existe pas" });
    }

    // vérifier si l'utilisateur existe
    if (!mongoose.Types.ObjectId.isValid(idutilisateur)) {
        return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
    } else {
        const user = await Utilisateur.findById(idutilisateur);
        if (!user) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }
    }

    const exists = await validatemediaID(idmedia);
    if (exists === false) {
        return res.status(400).json({ error: "Ce film ou cette série n'existe pas" });
    }

    try {
        const commentaire = await Commentaire.create({ contenu, idutilisateur, idmedia });
        res.status(200).json(commentaire);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const supprimerCommentaire = async (req, res) => {
    const idmedia = req.params.idmedia;
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ce commentaire n'existe pas" });
        }

        const exists = await validatemediaID(idmedia);
        console.log(exists);
        if (exists === false) {
            return res.status(400).json({ error: "Ce film ou cette série n'existe pas" });
        }
        const commentaire = await Commentaire.findOneAndDelete({ _id: id, idmedia: idmedia });

        if (!commentaire) {
            return res.status(404).json({ error: "Commentaire non trouvé" });
        }

        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const consulterCommentairesDeMedia = async (req, res) => {
    const { idmedia } = req.params;
    const exists = await validatemediaID(idmedia);
    if (exists === false) {
        return res.status(400).json({ error: "Ce film ou cette série n'existe pas" });
    }
    try {
        const commentaires = await Commentaire.find({ idmedia }).sort({ date: -1 });
        res.status(200).json(commentaires);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const likeCommentaire = async (req, res) => {
    const id = req.params.id;
    const idutilisateur = req.body.idutilisateur;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ce commentaire n'existe pas" });
        }
        if (!mongoose.Types.ObjectId.isValid(idutilisateur)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }
        user = await Utilisateur.findById(idutilisateur);
        if (!user) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ error: "Commentaire non trouvé" });
        }
        if (commentaire.likes.idutilisateurs.includes(idutilisateur)) {
            return res.status(400).json({ error: "Vous avez déjà liké ce commentaire" });
        }
        commentaire.likes.Number += 1;
        commentaire.likes.idutilisateurs.push(idutilisateur);
        const savesucc = await commentaire.save();
        if (!savesucc) {
            return res.status(400).json({ error: "Erreur lors de l'ajout du like" });
        }
        res.status(200).json({ message: "Like ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const dislikeCommentaire = async (req, res) => {
    const id = req.params.id;
    const idutilisateur = req.body.idutilisateur;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ce commentaire n'existe pas" });
        }
        if (!mongoose.Types.ObjectId.isValid(idutilisateur)) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }
        user = await Utilisateur.findById(idutilisateur);
        if (!user) {
            return res.status(400).json({ error: "Cet utilisateur n'existe pas" });
        }

        const commentaire = await Commentaire.findById(id);
        if (!commentaire) {
            return res.status(404).json({ error: "Commentaire non trouvé" });
        }
        if (commentaire.likes.idutilisateurs.includes(idutilisateur)) {
            commentaire.likes.Number -= 1;
            commentaire.likes.idutilisateurs.pop(idutilisateur);
            const savesucc = await commentaire.save();
            if (!savesucc) {
                return res.status(400).json({ error: "Erreur lors de l'ajout du like" });
            }
            res.status(200).json({ message: "Like supprimé avec succès" });
        } else {
            return res.status(400).json({ error: "Vous n'avez pas liké ce commentaire" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    ajouterCommentaire,
    supprimerCommentaire,
    consulterCommentairesDeMedia,
    likeCommentaire,
    dislikeCommentaire
}
