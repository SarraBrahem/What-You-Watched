import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/WatchListHeader";
import FAQ from "../Inscription/FAQ";


function FoireAuxQuestions() {
  return(
    <div>
      <div className="min-h-screen bg-black"> 
          <Header />
          <FAQ />
      </div>
      <div classname="bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default FoireAuxQuestions;