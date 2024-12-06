import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/WatchListHeader";

function CGU() {
    return(
      <div className="bg-orange-400 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-center text-3xl font-bold mb-4">Conditions Générales d'Utilisation</h1>
          <p className="text-lg mb-6">
            Bienvenue sur What-You-Watched. En accédant à notre site et en utilisant nos services, vous acceptez de vous conformer et d'être lié par les termes et conditions suivants. Si vous n'acceptez pas l'ensemble de ces termes et conditions, veuillez ne pas utiliser notre site.
          </p>
          <div className="space-y-4">
            <section>
              <h2 className="text-2xl font-semibold">1. Utilisation du site</h2>
              <p>
                Le site What-You-Watched permet de sauvegarder et consulter votre historique de visionnage. Vous êtes autorisé à utiliser le site uniquement à des fins personnelles et non commerciales. Toute autre utilisation est strictement interdite sans notre autorisation écrite préalable.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">2. Propriété intellectuelle</h2>
              <p>
                Tous les contenus présents sur le site, incluant les textes, graphiques, logos, images, clips vidéo, et logiciels sont la propriété de What-You-Watched ou de ses fournisseurs de contenu et sont protégés par les lois sur la propriété intellectuelle.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">3. Confidentialité</h2>
              <p>
                What-You-Watched s'engage à protéger votre vie privée. Les informations personnelles collectées par What-You-Watched lors de votre utilisation du site seront traitées conformément à notre politique de confidentialité, disponible séparément sur notre site.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">4. Limitation de responsabilité</h2>
              <p>
                Bien que What-You-Watched fasse tout son possible pour assurer la qualité et l'exactitude des services, nous ne pouvons garantir que le site sera toujours disponible, fiable, exempt d'erreurs ou que son contenu sera toujours actuel.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">5. Modification des conditions</h2>
              <p>
                What-You-Watched se réserve le droit de modifier les présentes conditions d'utilisation à tout moment et sans préavis. Il est de votre responsabilité de consulter régulièrement ces conditions pour vous assurer que vous êtes informé de toute modification.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">6. Droit applicable</h2>
              <p>
                Ces conditions d'utilisation sont régies et interprétées conformément aux lois du pays où le site est hébergé, sans donner effet à aucun principe de conflits de lois. Vous acceptez de vous soumettre à la compétence exclusive des tribunaux de ce pays.
              </p>
            </section>
          </div>
        </main>
        <div className="bg-white">
          <Footer />
        </div>
      </div>
    );
}

export default CGU;
