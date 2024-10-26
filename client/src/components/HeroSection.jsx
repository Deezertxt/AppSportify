import React, { useState } from 'react';
//import LoginModal from './LoginModal'; // 

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
          
            <nav className="flex justify-between items-center p-6 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <img src="https://cdn.blinkist.com/logo.svg" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-blue-600">Blinkist</h1>
                </div>
                <div className="space-x-6 text-gray-700">
                    <a href="#" className="hover:text-blue-600">Acerca de nosotros</a>
                    <a href="#" className="hover:text-blue-600">Contactanos</a>
                    <a href="#" className="hover:text-blue-600">Coaching</a>
                    <button
                        onClick={openLoginModal}  // Llama a la función cuando se haga clic en "Iniciar sesión"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </nav>

          
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
              
                <div className="max-w-md text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
                        Aprende <span className="italic">algo nuevo</span> cada día
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Obtén las ideas clave de la cima <span className="highlight bg-blue-100 px-2 py-1 rounded">libros</span>, 
                        <span className="highlight bg-purple-100 px-2 py-1 rounded">podcasts</span>, y 
                        <span className="highlight bg-green-100 px-2 py-1 rounded">expertos</span> 
                        en 15 minutos con la aplicación Sportify.
                    </p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-full mt-6 hover:bg-green-600">
                        Comenzar
                    </button>
                </div>

               
                <div className="mt-10 md:mt-0 md:max-w-md">
                    <img 
                        src="/path-to-your-image.png" 
                        alt="Mobile App" 
                        className="mobile-img transform transition duration-300 hover:scale-105 hover:shadow-lg" 
                    />
                </div>
            </div>

           
            {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
    );
}

export default HeroSection;

// app.jsx// 