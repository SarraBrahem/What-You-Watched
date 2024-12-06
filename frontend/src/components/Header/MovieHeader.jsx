import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchComponent from "../NavigationBar/MovieSearch"; // Vérifiez le chemin pour correspondre à votre structure de projet
import SearchComponentMobile from "../NavigationBar/MovieSearchMobile";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Nouvel état pour le menu
  const { isAuthenticated } = useAuth();


  return (
    <><header className="hidden md:flex bg-black text-white p-4 justify-between items-center border-b border-red-900 relative">
      <Link to="/" className="flex items-center ml-5">
        <img src={`${process.env.PUBLIC_URL}/images/WYW.png`} alt="Logo" className="h-10 mr-5" />
      </Link>
      {!isSearchExpanded && (
        <nav className={`flex-grow mx-4 ${isSearchExpanded ? 'hidden' : ''}`}>
          <ul className="flex justify-normal space-x-8 ml-5">
            <li><Link to="/films" className="text-red-500 hover:text-red-600 font-bold">FILMS</Link></li>
            <li><Link to="/series" className="hover:text-yellow-600 font-bold">SÉRIES</Link></li>
            <li><Link to="/qcm" className="hover:text-blue-600 font-bold">QCM</Link></li>
          </ul>
        </nav>
      )}

      <SearchComponent isExpanded={isSearchExpanded} setExpanded={setIsSearchExpanded} />

      {!isSearchExpanded && (
        <div className="flex items-center space-x-4">
          <Link to="/UserProfile" className="hover:text-red-200">Profil</Link>
          <Link to="/watchlist" className="hover:text-red-300">Ma Watchlist</Link>
          {isAuthenticated ? (
            // Affichez l'avatar si l'utilisateur est connecté
            <Link to="/UserProfile" className="hover:text-red-300">
              <img src="images/RondSansFond.png" alt="Avatar" className="h-8 w-8 rounded-full" /> {/* Assurez-vous d'avoir un avatar ou utilisez un placeholder */}
            </Link>
          ) : (
            // Affichez le bouton de connexion si l'utilisateur n'est pas connecté
            
            <Link to="/connexion" className="bg-white hover:bg-gray-600 hover:text-white text-black font-bold py-2 px-4 rounded">Connexion</Link>

          )}
        </div>
      )}
    </header>

    <header className="flex md:hidden lg:hidden bg-black text-white p-4 justify-between items-center border-b border-red-900 relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-20 font-semibold text-5xl -mt-2 mr-4">
        {/* Icône du bouton menu ici, peut être une image ou un svg */}
        ☰
      </button>
      <SearchComponentMobile />
      <div className={`absolute top-0 left-0 w-4/5 h-screen bg-black bg-opacity-95 z-10 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col items-center">
            {/* Ici tu peux ajouter ton logo et tes liens */}
            <img src={`${process.env.PUBLIC_URL}/images/WYW.png`} alt="Logo" className="h-14 mt-5" />
            <ul className="mt-10 space-y-8 text-center">
            <li><Link to="/films" className="text-red-500 hover:text-red-600 font-bold text-2xl">FILMS</Link></li>
            <li><Link to="/series" className="hover:text-yellow-600 font-bold text-2xl">SÉRIES</Link></li>
            <li><Link to="/qcm" className="hover:text-blue-600 font-bold text-2xl">QCM</Link></li>
              {/* Ajoute le reste de tes liens ici */}
            </ul>
            <ul className="mt-48 space-y-6 text-center">
              <li><Link to="/UserProfile" className="hover:text-yellow-200 font-semibold">Profil</Link></li>
              <li><Link to="/watchlist" className="hover:text-red-300 font-semibold">Ma Watchlist</Link></li>
              {isAuthenticated ? (
              // Affichez l'avatar si l'utilisateur est connecté
              <li>
                <Link to="/UserProfile" className="hover:text-indigo-300">
                  <img src="images/RondSansFond.png" alt="Avatar" className="ml-2 mt-4 h-20 w-20 rounded-full" /> {/* Assurez-vous d'avoir un avatar ou utilisez un placeholder */}
                </Link>
              </li>
            ) : (
              // Affichez le bouton de connexion si l'utilisateur n'est pas connecté
              <li>
                <Link to="/connexion" className="bg-white hover:bg-gray-600 hover:text-white text-black font-bold py-2 px-4 rounded">Connexion</Link>
              </li>
            )}            
          </ul>
          </div>
        </div>
      <Link to="/" className="flex items-center">
        <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} alt="Logo" className="h-20 shadow-sm rounded-full shadow-red-600" />
      </Link>
    </header></>
  );
}

export default Header;