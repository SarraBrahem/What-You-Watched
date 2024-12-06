import React from "react";

function Error403Page() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-400">
      <div className="text-center">
        <div className="flex items-center justify-center text-[240px] font-extrabold text-gray-800 -mt-24 mb-8">
          <span>4</span>
          <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} alt="0" className="w-[180px] h-[180px] object-cover mx-2 mt-8" /> {/* Ajustez la taille selon votre besoin */}
          <span>3</span>
        </div>
        <h1 className="text-[34px] md:text-[53px] lg:text-[71px] font-extrabold -mt-24 text-gray-800 mb-8">ERROR ERROR ERROR ERROR</h1>
        <p className="text-2xl font-bold bg-gray-800 text-white mb-8 py-2">Accès Non Autorisé</p>
        <a href="/"
          className="px-10 py-3 font-bold border-2 text-white bg-indigo-500 rounded-md hover:bg-gray-900 transition-all duration-200 ease-in-out">
          Retourner sur la page d'accueil
        </a>
      </div>
    </div>
  );
}

export default Error403Page;
