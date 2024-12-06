import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

function FormulaireInscription() {
  // States for each form field
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post('https://what-you-watched-backend.vercel.app/api/authRoutes/signup', {
        nom: nom,
        prenom: prenom,
        username: username,
        email: email,
        mot_de_passe: motDePasse,
      });
      console.log('Utilisateur créé :', response.data);
      // Redirection to homepage after signup
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  };

  return (
    <div className="relative bg-black overflow-hidden h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="bg-cover bg-center w-full h-full absolute" style={{ backgroundImage: 'url("/images/SignUp_Background.png")' }}></div>
        {/* LOGO GAUCHE */}
        <div className="absolute z-10 top-0 xl:top-72 mt-4 md:mr-80 lg:mr-64 xl:mr-80 flex justify-start md:w-1/2">
          <a href="/">
            <img src="/images/RondSansFond.png" alt="Logo" className="xl:brightness-50 w-28 h-28 -mt-4 mr-96 sm:w-24 sm:h-24 md:-mt-4 md:ml-28 md:w-28 md:h-28 lg:-mt-4 lg:ml-40 xl:w-48 xl:h-48 xl:ml-0" />
          </a>
        </div>
        {/* LOGO DROITE */}
        <div className="relative z-10 hidden xl:flex top-6 lg:ml-80 justify-end w-1/2">
          <a href="/">
            <img src="/images/RondSansFond.png" alt="Logo" className="brightness-50 w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 lg:mr-24 xl:w-48 xl:h-48 xl:mr-0" />
          </a>
        </div>

        <div className="absolute z-0  w-full h-full bg-black opacity-55"></div>
        <div className="z-20 p-4 sm:p-8 m-4 w-full max-w-md bg-gray-700 rounded-lg shadow-lg absolute">
          <div className="text-center text-white mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold">Inscription</h1>
            <p className="text-base">Inscrivez-vous pour commencer votre aventure</p>
          </div>
          <form className="space-y-4 z-30" onSubmit={handleSubmit}>
            {/* Nom */}
            <div>
              <label htmlFor="nom" className="block mb-1 text-white">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="White"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full p-3 rounded border border-gray-200 outline-none focus:border-purple-500"
              />
            </div>
            {/* Prénom */}
            <div>
              <label htmlFor="prenom" className="block mb-1 text-white">Prénom</label>
              <input
                id="prenom"
                type="text"
                placeholder="Walter"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full p-3 rounded border border-gray-200 outline-none focus:border-purple-500"
              />
            </div>
            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 text-white">Nom d'Utilisateur</label>
              <input
                id="username"
                type="text"
                placeholder="Walter_White000"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded border border-gray-200 outline-none focus:border-purple-500"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-white">Mail</label>
              <input
                id="email"
                type="email"
                placeholder="example@wyw.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded border border-gray-200 outline-none focus:border-purple-500"
              />
            </div>
            {/* Mot de Passe */}
            <div>
              <label htmlFor="password" className="block mb-1 text-white">Mot de Passe</label>
              <input
                id="password"
                type="password"
                placeholder="Azerty123456"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full p-3 rounded border border-gray-200 outline-none focus:border-purple-500"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Créer Mon Compte
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormulaireInscription;
