import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles.css";
import "./tailwind.css";
{/* Liens du Header */}
import Connexion from "./pages/Connexion/Connexion";
import FilmsPage from "./pages/Genres/Films/PageFilms";
import Series from "./pages/Genres/Series/PageSeries";
import Accueil from "./pages/Accueil/Accueil";
import QCMHomePage from "./pages/QCM/Home";
import Watchlist from "./pages/Watchlist/Watchlist";
{/* Liens des Pages de Films et Séries */}
import GenrePage from "./pages/Genres/GenresPage";
import MovieHomePage from "./pages/Genres/Films/AccueilFilm";
import SeriesHomePage from "./pages/Genres/Series/AccueilSeries";
import MovieDetailPage from "./pages/Genres/Films/FicheDetail/MovieDetailPage";
import SeriesDetailPage from "./pages/Genres/Series/FicheDetail/SeriesDetailPage";
{/* QCM */}
import SelectionQCM from "./pages/QCM/SelectionQCM";
import Qcm from "./pages/QCM/QCM";
import RecommendationsPage from "./pages/QCM/ResultsPage";
{/* Liens du Footer */}
import Contact from "./pages/InsideFooter/Contact";
import FAQ from "./pages/InsideFooter/FoireAQ";
import AboutUs from "./pages/InsideFooter/AboutUs";
import Creators from "./pages/InsideFooter/Creators";
import Privacy from "./pages/InsideFooter/Privacy";
import CGU from "./pages/InsideFooter/CGU";
import SupportPage from './pages/InsideFooter/SupportPage';
{/* Autres */}
import { WatchlistProvider } from './pages/Watchlist/WatchlistContext';
import Signup from "./pages/Inscription/Inscription";
import FormulaireInscription from "./pages/FormulaireInscription/FormulaireInscription";
import UserProfile from "./pages/UserProfile/UserProfile";
import ErrorPage from "./pages/Divers/Page404";




function App() {
  return (
    <AuthProvider>
      <Router>
        <WatchlistProvider>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
          <Route path="/films" element={<MovieHomePage />} />
          <Route path="/series" element={<SeriesHomePage />} />
          <Route path="/films/:genre" element={<FilmsPage />} />
          <Route path="/series/:genre" element={<Series />} />
          <Route path="/films/details/:slug/:movieId" element={<MovieDetailPage />} />
          <Route path="/series/details/:slug/:seriesId" element={<SeriesDetailPage />} />
          <Route path="/qcm" element={<QCMHomePage />} />
          <Route path="/qcm-selection" element={<SelectionQCM />} />
          <Route path="/qcm/:type" element={<Qcm />} />
          <Route path="/recommendations/:type" element={<RecommendationsPage />} />
          <Route path="/Inscription" element={<Signup />} />
          <Route path="/signup" element={<FormulaireInscription />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Watchlist" element={<Watchlist />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/A-Propos" element={<AboutUs />} />
          <Route path="/Creators" element={<Creators />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/CGU" element={<CGU />} />
          <Route path="/Support-Page" element={<SupportPage />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Accueil />} />
        </Routes>
      </WatchlistProvider>
    </Router>
  </AuthProvider> 
  );
}
export default App;