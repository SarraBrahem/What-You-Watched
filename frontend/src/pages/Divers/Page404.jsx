import React from "react";

function Error404Page() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-400">
      <div className="text-center">
        <div className="flex items-center justify-center text-[84px] md:text-[240px] font-extrabold text-gray-800 -mt-24 mb-8">
          <span>4</span>
          <img src={`${process.env.PUBLIC_URL}/images/RondSansFond.png`} alt="0" className="w-[72px] h-[72px] md:w-[180px] md:h-[180px] object-cover md-mx-2 md-mt-8" /> {/* Ajustez la taille selon votre besoin */}
          <span>4</span>
        </div>
        <h1 className="mt-2 text-[20px] md:text-[53px] lg:text-[71px] font-extrabold md:-mt-24 text-gray-800 mb-8">ERROR ERROR ERROR ERROR</h1>
        <p className="text-lg md-text-2xl font-bold bg-gray-800 text-white mb-8 py-2">Page Introuvable</p>
        <a href="/"
          className="px-10 py-3 font-bold border-2 border-gray-800 text-gray-800 bg-gray-100 rounded-md hover:bg-gray-900 hover:border-white hover:text-white transition-all duration-200 ease-in-out">
          Retourner sur la page d'accueil
        </a>
      </div>
    </div>
  );
}

export default Error404Page;
