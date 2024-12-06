import React from 'react';


function Features() {
  return (
    
    <div className="relative bg-black">     
    <div className="relative">
      <div className='bg-black py-14'/>
        <div className="mx-auto grid max-w-7xl gap-24 px-8 lg:grid-flow-col-dense lg:grid-cols-2 mb-24">
          <div className="px-6 mx-auto max-w-xl lg:mx-0 lg:max-w-none lg:py-16">
              <div>
                <div>
                  <span className="flex items-center justify-center h-12 w-12 rounded-xl bg-pink-800">  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                      class="h-8 w-8 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z">
                      </path>
                    </svg>
                  </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white">
                    Tenez à jour votre historique de visionnage !
                  </h2>
                  <p className="mt-4 text-sm md:text-lg text-gray-300">
                    Explorez 'What You Watched' pour garder une trace facilement de vos séries, animes et films préférés.
                  </p>
                </div>
              </div>
            </div>
            <div class="-mt-10 sm:mt-16 lg:mt-0">
              <div class="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-8">
              <img
                loading="lazy"
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:w-auto lg:h-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:max-w-none"
                src="images/Watchlist.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 mb-24 ">
          <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span class="flex items-center justify-center h-12 w-12 rounded-xl bg-pink-800">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                    class="h-8 w-8 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z">
                    </path>
                  </svg>
                </span> 
              </div>
              <div class="mt-6">
                <h2 class="text-xl md:text-3xl font-bold tracking-tight text-white">
                  Découvrez ce qui est certain de vous plaire !                
                </h2>
                <p class="mt-4 text-sm md:text-lg text-gray-300">
                  Répondez à notre questionnaire personnalisé pour recevoir des recommandations 
                  sur mesure basées sur vos goûts cinématographiques.
                </p>
                <div class="mt-6">
                  <a class="inline-flex rounded-lg bg-pink-900 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                    href="/login">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-0 flex justify-center lg:block">
          <div class="lg:relative lg:m-0 lg:h-full lg:px-0">
            <img alt="Inbox user interface" loading="lazy"
              class="max-w-xs sm:max-w-sm md:max-w-xl lg:w-auto lg:h-5/6 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
              src="images/QCM.png"/>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
    <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ">
      <div class="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-end-2">
        <div>
          <div>
            <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                class="h-8 w-8 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z">
                </path>
              </svg>
            </span>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl font-bold tracking-tight text-white">
              Communiquez vos avis avec la communauté What You Watched !                
            </h2>
            <p class="mt-4 text-sm md:text-lg text-gray-300">
              Partagez vos évaluations, laissez des commentaires et connectez-vous avec d'autres passionnés de séries et films.
            </p>
          </div>
      </div>
        </div>
        <div class="mt-12 sm:mt-16 lg:mt-16">
              <div class="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-8">
              <img
                loading="lazy"
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:w-auto lg:h-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:max-w-none"
                src="/images/Commentaires.png"
                alt=""
              />
            </div>
          </div>
      </div>
    </div>
    <div className='bg-black py-14'/>
  </div>
  );
};

export default Features;