import React, { useState } from 'react';
function HeroSection() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const openLoginModal = () => {
        setLoginModalOpen(true);
    };
    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };
    return (
        <div className="bg-gray-50 min-h-screen">
          
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
               
                <div className="max-w-md text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
                        Aprende <span className="italic">algo nuevo</span> cada día
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Obtén las ideas clave de la cima <span className="highlight bg-blue-100 px-2 py-1 rounded">audiolibros</span>, 
                        <span className="highlight bg-purple-100 px-2 py-1 rounded">resumenes</span>, y 
                        <span className="highlight bg-green-100 px-2 py-1 rounded">expertos</span> 
                        en 15 minutos con la aplicación Sportify.
                    </p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-full mt-6 hover:bg-green-600">
                        Comenzar
                    </button>
                </div>

            </div>
            {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
    );
}

export default HeroSection;