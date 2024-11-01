//navbar//
import React, { useState } from 'react';
import Modal from './Modal';
import ModalRegistro from './ModalRegistro';
import ModalInicioSesion from './ModalInicioSesion';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false); 
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const openModal = () => {
        setModalOpen(true);
        setMenuOpen(false); 
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
          
            <nav className="hidden md:flex justify-between items-center p-6 bg-first shadow-md">
                <div className="flex items-center space-x-2">
                    <img src="logoS.svg" alt="Logo" className="w-24 h-24" />
                    <h1 className="text-xl font-semibold text-white">Sportify</h1>
                </div>
                <div className="space-x-8 text-gray-400">
                    <a href="#" className="hover:text-white">Contáctanos</a>
                    <a href="#" className="hover:text-white">Sobre nosotros</a>
                    <a href="#" className="hover:text-white">Coaching</a>
                    <button
                        onClick={() => {
                            openModal();
                            setIsLogin(true);
                        }} // Cambiar a openModal
                        className="bg-[#A8DADC] text-white px-4 py-2 rounded hover:bg-[#457B9D]"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </nav>


            <div className="md:hidden flex justify-between items-center p-6 bg-first">
                <div className="flex items-center space-x-0">
                    <button onClick={toggleMenu} className="text-[#457B9D] mr-2">
                        <span className="material-icons">menu</span>
                    </button>
                    <img src="logoS.svg" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-[#1D3557]">Sportify</h1>
                </div>
            </div>

            
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white bg-opacity-50 z-40" onClick={toggleMenu}>
                    <div className="fixed left-0 top-0 w-64 h-full bg-first shadow-lg z-50 p-6">
                        <div className="flex items-center space-x-4 mb-8">
                            <img src="logoS.svg" alt="Logo" className="w-12 h-12" />
                            <h1 className="text-xl font-semibold text-gray-400">Sportify</h1>
                        </div>
                        <button onClick={toggleMenu} className="text-gray-400 mb-4">Cerrar</button>
                        <div className="flex flex-col space-y-6">
                            <a href="#" className="hover:text-white">Contáctanos</a>
                            <a href="#" className="hover:text-white">Sobre nosotros</a>
                            <a href="#" className="hover:text-white">Coaching</a>
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
            {isModalOpen && 
            <Modal isOpen={isModalOpen} closeModal={closeModal} >
                {isLogin ? (
                    <ModalInicioSesion closeModal={closeModal} openRegister={toggleForm}/>
                ):(
                    <ModalRegistro closeModal={closeModal} openLogin={toggleForm} />
                )}
            </Modal>}
        </>
    );
};

export default Navbar;