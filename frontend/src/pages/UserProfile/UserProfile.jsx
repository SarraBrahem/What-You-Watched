import React, { useState, useCallback, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserProfile() {
  const [userPreferences, setUserPreferences] = useState({
      nom: "",
      prenom: "",
      username: "",
      email: "", 
      password: ""
  });
  const [errors, setErrors] = useState({});


  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/connexion'); 
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Vérifie d'abord si le token est disponible pour éviter des appels API non autorisés
      if (!token) {
        console.error('Token non disponible, veuillez vous connecter.');
        navigate('/connexion'); 
        return;
      }
  
      try {
        const { data } = await axios.get('https://what-you-watched-backend.vercel.app/api/authRoutes/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserPreferences({
          nom: data.utilisateur.nom,
          prenom : data.utilisateur.prenom,
          username : data.utilisateur.username,
          email: data.utilisateur.email,
          password: ""  // le mot de passe ne doit pas être chargé pour des raisons de sécurité
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'utilisateur', error);
        setError('Impossible de charger les données utilisateur.');
      }
    };
  
    fetchData();
  }, [token, navigate]); 
  


  const validateField = useCallback((name, value) => {
      let newErrors = { ...errors };
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email invalide.';
      } else if (name === 'password' && value.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
      } else if (name === 'username' && (!value || value.length < 3)) {
          newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
      } else {
          delete newErrors[name];
      }
      setErrors(newErrors);
  }, [errors]);

  const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setUserPreferences(prevState => ({ ...prevState, [name]: value }));
      validateField(name, value);
  }, [validateField]);

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0 && Object.values(userPreferences).every(value => value)) {
          console.log("Submitting:", userPreferences);
          // Placeholder for submitting data to backend
      } else {
          alert('Veuillez corriger les erreurs avant de soumettre.');
      }
  };

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  


  const handleChangePasswordSubmit = e => {
    e.preventDefault();
    // Logique pour changer le mot de passe
    console.log("Changement de mot de passe soumis");
    setShowChangePasswordModal(false); // Fermer le modal après soumission
  };

  return (
  <div>
    <div>
      <Header/>
    </div>
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex flex-col -mt-20 md:mt-0 items-center justify-center bg-neutral-900">
      <div className="relative text-center xl:-mt-20 -mb-8">
              <Link to="/">
                <img src={require("./RondSansFond.png")} alt="Votre logo" className="w-28 md:w-36 h-auto relative z-20" />
              </Link>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2 shadow-xl z-5" style={{ boxShadow: "0 0 10px 5px #fff" }}></div>
            </div>
            <div className="p-10 rounded-lg shadow-xl w-80 md:w-3/4 md:h-3/4 bg-neutral-800" style={{ boxShadow: "0 0 15px 5px #fff" }}>
              <p className="mt-2 md:mt-6 md:mb-2 text-xl md:text-3xl font-bold leading-5 text-white">Profil</p>
              <div className="flex w-full items-center gap-2 py-4 mb-0 md:mb-2 text-sm text-gray-400 font-semibold">
                <div className="h-0.5 w-full bg-gray-400"></div>
              </div>
              {error && <p className="mb-4 text-red-500">{error}</p>}

              {/* Nom d'utilisateur et Email en lecture seule avec options de modification */}
              <form>
              <div className="">
              <label className="block text-base md:text-xl font-medium text-slate-200 mb-1">Nom</label>
                  <span className="text-xs md:text-base text-start bg-neutral-600 rounded ml-0 md:py-0.5 px-10 md:px-24 font-medium text-slate-300">{userPreferences.nom}</span>
                  {errors.nom && <p className="text-red-500 text-xs italic">{errors.nom}</p>}
              </div>
              <div className="md:mt-2">
              <label className="block text-base md:text-xl font-medium text-slate-200 mb-1">Prenom</label>
                  <span className="text-xs md:text-base text-start bg-neutral-600 rounded ml-0 md:py-0.5 px-10 md:px-24 font-medium text-slate-300">{userPreferences.prenom}</span>
                  {errors.prenom && <p className="text-red-500 text-xs italic">{errors.prenom}</p>}
              </div>
              <div className="md:mt-2">
              <label className="block text-base md:text-xl font-medium text-slate-200 mb-1">Nom d'utilisateur</label>
                  <span className="text-xs md:text-base text-start bg-neutral-600 rounded ml-0 md:py-0.5 px-10 md:px-24 font-medium text-slate-300">{userPreferences.username}</span>
                  {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
              </div>
              <div className="md:mt-2">
              <label className="block text-base md:text-xl font-medium text-slate-200 mb-1">Email</label>
                  <span className="text-xs md:text-base text-start bg-neutral-600 rounded ml-0 px-10 md:py-0.5 md:px-24 font-medium text-slate-300">{userPreferences.email}</span>
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>

              <div className="md:mt-2">
              <label htmlFor="username" className="block text-base md:text-xl font-medium text-slate-200 mb-1">Mot de passe</label>
                  <span className="text-xs md:text-base text-start bg-neutral-600 rounded ml-0 px-10 md:px-24 font-medium text-slate-300">{userPreferences.password}</span>
                  {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                  <button type="button" className="flex text-indigo-600 hover:text-indigo-900 text-sm" onClick={() => setShowChangePasswordModal(true)}>Changer</button>
              </div>
              {/* Modal pour changer le mot de passe */}
              {showChangePasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="flex bg-white p-5 rounded-lg items-center justify-center w-2/3">
                    <form onSubmit={handleChangePasswordSubmit} className="flex flex-col mb-3 items-center justify-center">
                      <div className="text-lg font-semibold mb-5">Changer le mot de passe</div>
                      <input type="password" placeholder="Ancien mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                      <input type="password" placeholder="Nouveau mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                      <input type="password" placeholder="Confirmez le nouveau mot de passe" className="input text-center mb-3 border-2 border-gray-400 rounded-md p-1" required />
                      <button type="submit" className="button border-2 px-2 rounded-lg border-black mt-2 mb-2 hover:text-white hover:bg-gradient-to-r from-orange-400 to-pink-500 hover:border-rose-600">Changer</button>
                      <button type="button" className='px-2 rounded-lg border-black' onClick={() => setShowChangePasswordModal(false)}>Annuler</button>
                    </form>
                  </div>
                </div>
              )}

              {/* Bouton de soumission des modifications */}
              <button type="submit" className="w-full flex justify-center mb-4 md:mb-10 mt-4 md:mt-8 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                  Enregistrer les modifications
              </button>
              <button onClick={handleLogout} className="w-full flex justify-center mb-0 md:mb-10 mt-6 md:mt-10 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"> Déconnexion </button>                
          </form>
        </div>
    </div>
    <div className="md:w-1/2 bg-cover brightness-50" style={{ backgroundImage: "url('/images/SignUp_Background.png')" }}></div>
    </div>
    <Footer />
  </div>
  );
}

export default UserProfile;