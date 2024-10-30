import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { Navigate } from 'react-router-dom';
function HeroSection() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const openLoginModal = () => {
        Navigate('/login');
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {

        setLoginModalOpen(false);
    };

    const images = [
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fddd.webp?alt=media&token=0c9bd3e5-3da9-4fc6-8c3b-5ec97791d6c4",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Faaaaaaaa.jpg?alt=media&token=fee6b979-ea7d-4fdf-bb53-253fefbfb14c",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fmessi.jpg?alt=media&token=a8a1dd3d-949b-4861-9d33-abf3a002197b",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2F450_1000.jpg?alt=media&token=ccdfbe81-814e-4f84-ac59-36d39e3ede93",
    ];
    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar openLoginModal={openLoginModal} />


            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">

                <div className="max-w-md text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-6">
                        Aprende <span className="italic">algo nuevo</span> cada día
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Obtén las ideas clave de la cima <span className="highlight bg-blue-100 px-2 py-1 rounded">audiolibros</span>,
                        <span className="highlight bg-purple-100 px-2 py-1 rounded">resumenes</span>, y
                        <span className="highlight bg-green-100 px-2 py-1 rounded">deporte</span>
                        en 15 minutos con la aplicación Sportify.
                    </p>
                    <button className="bg-[#A8DADC] text-white px-4 py-2 rounded hover:bg-[#457B9D]">
                        Comenzar
                    </button>
                </div>


                <div className="mt-10 md:mt-0 md:max-w-lg md:mx-auto">
                    <Carousel images={images} />
                </div>

            </div>


            {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
    );
}

export default HeroSection;


