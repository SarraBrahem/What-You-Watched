import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function SupportPage() {
  return (
    <div>
      <div className="bg-blue-900 min-h-screen"> 
        <div>
        <Header />
        <div className="container mx-auto p-6 text-center">
          <div className="border-b-2">
            <h1 className="text-4xl font-bold text-center mb-4 text-white">Support</h1>
          </div>
          <p className="text-white text-xl font-bold mt-8">Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter :</p>
          <ul className="list-disc pl-5 mt-4 text-2xl text-white">
            <li>Email : support@what-you-watched.com</li>
            <li>Téléphone : +123 456 7890</li>
          </ul>
        </div>
        </div>
      </div>
      <div className="bg-white">
        <Footer />
      </div>
    </div>
  );
}

export default SupportPage;
