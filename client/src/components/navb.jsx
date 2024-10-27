import React, { useState } from 'react';


const Navbar = ({ openLoginModal }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false); // Nuevo estado para el modal

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const openModal = () => {
        setLoginModalOpen(true);
        setMenuOpen(false);
    };

    const closeModal = () => {
        setLoginModalOpen(false);
    };

    return (
        <>
           
            <nav className="hidden md:flex justify-between items-center p-6 bg-[#F1FAEE] shadow-md">
                <div className="flex items-center space-x-2">
                    <img src="https://cdn.blinkist.com/logo.svg" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-[#1D3557]">Sportify</h1>
                </div>
                <div className="space-x-8 text-[#457B9D]">
                    <a href="#" className="hover:text-[#E63946]">Contáctanos</a>
                    <a href="#" className="hover:text-[#E63946]">Sobre nosotros</a>
                    <a href="#" className="hover:text-[#E63946]">Coaching</a>
                    <button
                        onClick={openModal} 
                        className="bg-[#A8DADC] text-white px-4 py-2 rounded hover:bg-[#457B9D]"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </nav>

            {/* Botón de menú para móviles */}
            <div className="md:hidden flex justify-between items-center p-6 bg-[#F1FAEE]">
                <div className="flex items-center space-x-0">
                    <button onClick={toggleMenu} className="text-[#457B9D] mr-2">
                        <span className="material-icons">menu</span>
                    </button>
                    <img src="https://cdn.blinkist.com/logo.svg" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-[#1D3557]">Sportify</h1>
                </div>
            </div>

            {/* Menú lateral */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#1D3557] bg-opacity-50 z-40" onClick={toggleMenu}>
                    <div className="fixed left-0 top-0 w-64 h-full bg-[#F1FAEE] shadow-lg z-50 p-6">
                        <div className="flex items-center space-x-4 mb-8">
                            <img src="https://cdn.blinkist.com/logo.svg" alt="Logo" className="w-12 h-12" />
                            <h1 className="text-xl font-semibold text-[#1D3557]">Sportify</h1>
                        </div>
                        <button onClick={toggleMenu} className="text-[#457B9D] mb-4">Cerrar</button>
                        <div className="flex flex-col space-y-6">
                            <a href="#" className="hover:text-[#E63946]">Contáctanos</a>
                            <a href="#" className="hover:text-[#E63946]">Sobre nosotros</a>
                            <a href="#" className="hover:text-[#E63946]">Coaching</a>
                            <button
                                onClick={openModal} 
                                className="bg-[#A8DADC] text-white px-4 py-2 rounded hover:bg-[#457B9D]"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de inicio de sesión */}
            {isLoginModalOpen && <LoginModal closeModal={closeModal} />} {/* Renderiza el modal */}
        </>
    );
};

export default Navbar;
