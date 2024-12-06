// Footer/index.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <><div >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Section Logo et Nom */}
        <div className="mb-4 md:mb-0 flex flex-col sm:flex-row items-center">
          <div>
            <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} className="h-28 ml-14 mr-10" />
            <br></br>
            <div className="relative">
              <select className="bg-black text-white p-2 rounded items-center cursor-pointer ml-16">
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
          </div>
          </div>
          <div className="ml-4 pt-12 justify-center flex flex-col font-bold items-center">
            <p className="mb-3 md:mx-2 text-gray-500 text-xs" >ENTREPRISE</p>
            <Link to="/A-Propos" className="mb-3 md:mb-3 md:mx-2 hover:underline">À propos</Link>
            <Link to="/Creators" className="mb-3 md:mb-3 md:mx-2 hover:underline">Créateurs</Link>
            <Link to="/privacy-policy" className="mb-3 md:mb-3 md:mx-2 hover:underline">Confidentialité</Link>
            <Link to="/FAQ" className="mb-2 md:mb-3 md:mx-2 hover:underline">FAQ</Link>
            <Link to="/CGU" className="mb-2 md:mb-3 md:mx-2 hover:underline">CGU</Link>
          </div>
          <div className="ml-4 md:ml-14 pt-12 md:pt-0 justify-center flex flex-col font-bold items-center mb-14">
            <p className="mb-3 md:mx-2 text-gray-500 text-xs" >LIENS UTILES</p>
            <Link to="/Support-Page" className="mb-3 md:mb-3 md:mx-2 hover:underline">Support</Link>
            <Link to="/Contact" className="mb-3 md:mb-3 md:mx-2 hover:underline">Contact</Link>
          </div>
          <div className="ml-4 md:ml-14 justify-center flex flex-col font-bold items-center mb-5">
            <p className="mb-3 md:mx-2 text-gray-500 text-xs" >NOUS SUIVRE</p>
            <a href="https://www.facebook.com/soufianee.elm78" className="mb-3 md:mb-3 md:mx-2 hover:underline">Facebook</a>
            <a href="https://twitter.com/42Yellow_" className="mb-3 md:mb-3 md:mx-2 hover:underline">Twitter</a>
            <a href="https://www.instagram.com/aruncgss/" className="mb-3 md:mb-3 md:mx-2 hover:underline">Instagram</a>
          </div>
        </div>        
      </div>
    </div>
    <div>
      <div>
        <footer className="h-15 flex justify-center bg-black text-white text-center p-5 mt-8">
          <p>&copy; {new Date().getFullYear()}, What You Watched. All rights reserved.</p>
        </footer>
      </div>
    </div></>
  );
}


export default Footer;