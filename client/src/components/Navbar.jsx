import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importar framer-motion
import Modal from './modals/Modal';
import ModalRegistro from './modals/ModalRegistro';
import ModalInicioSesion from './modals/ModalInicioSesion';

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
            {/* Navbar para pantallas grandes */}
            <motion.nav
                className="hidden md:flex justify-between items-center p-6 bg-gradient-to-r from-[#023047] to-[#3089b1] shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="flex items-center space-x-2">
                    <img src="logoS.svg" alt="Logo" className="w-24 h-24" />
                    <h1 className="text-xl font-semibold text-white">Sportify</h1>
                </div>
                <div className="space-x-8 text-gray-300">
                    <a href="/contactanos" className="hover:text-white transition-all duration-300">Contáctanos</a>
                    <a href="/sobrenosotros" className="hover:text-white transition-all duration-300">Sobre nosotros</a>
                    <motion.button
                        onClick={() => {
                            openModal();
                            setIsLogin(true);
                        }}
                        className="bg-[#2fb9a9] text-white px-6 py-2 rounded-full hover:bg-[#457B9D] transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                    >
                        Iniciar sesión
                    </motion.button>
                </div>
            </motion.nav>

            {/* Navbar para pantallas pequeñas */}
            <div className="md:hidden flex justify-between items-center p-6 bg-gradient-to-r from-[#023047] to-[#8ECAE6]">
                <div className="flex items-center space-x-0">
                    <button onClick={toggleMenu} className="text-white mr-2 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <img src="logoS.svg" alt="Logo" className="w-8 h-8" />
                    <h1 className="text-xl font-semibold text-white">Sportify</h1>
                </div>
            </div>

            {/* Menú desplegable en pantallas pequeñas */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
                    <div className="fixed left-0 top-0 w-64 h-full bg-gradient-to-r from-[#023047] to-[#8ECAE6] shadow-lg z-50 p-6 rounded-r-3xl">
                        <div className="flex items-center space-x-4 mb-8">
                            <img src="logoS.svg" alt="Logo" className="w-12 h-12" />
                            <h1 className="text-xl font-semibold text-gray-300">Sportify</h1>
                        </div>
                        <motion.button
                            onClick={toggleMenu}
                            className="text-gray-300 mb-4 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            Cerrar
                        </motion.button>
                        <div className="flex flex-col space-y-6">
                            <a href="/contactanos" className="hover:text-white transition-all duration-300">Contáctanos</a>
                            <a href="/sobrenosotros" className="hover:text-white transition-all duration-300">Sobre nosotros</a>
                            <motion.button
                                onClick={openModal}
                                className="bg-[#217e73] text-white px-6 py-2 rounded-full hover:bg-[#457B9D] transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                            >
                                Iniciar sesión
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de inicio de sesión o registro */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} closeModal={closeModal}>
                    {isLogin ? (
                        <ModalInicioSesion closeModal={closeModal} openRegister={toggleForm} />
                    ) : (
                        <ModalRegistro closeModal={closeModal} openLogin={toggleForm} />
                    )}
                </Modal>
            )}
        </>
    );
};

export default Navbar;
