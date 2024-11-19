import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Modal from '../components/Modal';
import ModalInicioSesion from '../components/ModalInicioSesion';
import ModalRegistro from '../components/ModalRegistro';
import ModalReu from './ModalReu';
import { Navigate, useLocation } from 'react-router-dom';

function HeroSection() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCierreSesionOpen, setCierreSesionOpen] = useState(false);
    const location = useLocation();

    const openLoginModal = () => {
        Navigate('/login');
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {

        setLoginModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsLogin(false);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const toggleForm = () => setIsLogin(!isLogin);

    useEffect(() => {
        if (location.state?.loggedOut) {
            setCierreSesionOpen(true); // Show modal if logged out
        }
    }, [location]);

    const closeCierreSesionModal = () => {
        setCierreSesionOpen(false); // Cierra el modal de cierre de sesión
    };

    const images = [
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Faaaaddddddddddddd.jpg?alt=media&token=66fe8acc-013d-473f-93a7-88fb1d200f87",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Faaaaaaaa.jpg?alt=media&token=fee6b979-ea7d-4fdf-bb53-253fefbfb14c",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fmessi.jpg?alt=media&token=a8a1dd3d-949b-4861-9d33-abf3a002197b",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fholis.jpg?alt=media&token=fec38952-f2eb-416b-9cc6-fd3de2375d64",
        "https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fdsart.jpg?alt=media&token=1c37bbd8-7806-4036-a008-0addadf1bb16"
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
                        en menos de 10 minutos con la aplicación Sportify.
                    </p>
                    <button onClick={openRegisterModal} className="bg-[#A8DADC] text-white px-4 py-2 rounded hover:bg-[#457B9D]">
                        Comenzar
                    </button>
                </div>


                <div className="mt-10 md:mt-0 md:max-w-lg md:mx-auto">
                    <Carousel images={images} />
                </div>

            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} closeModal={closeModal}>
                    {isLogin ? (
                        <ModalInicioSesion closeModal={closeModal} openRegister={toggleForm} />
                    ) : (
                        <ModalRegistro closeModal={closeModal} openLogin={toggleForm} />
                    )}
                </Modal>
            )}

            {isCierreSesionOpen && (
                <ModalReu
                    title="¡Cierre de Sesion exitoso de Sportify!"
                    message="Esperamos verte pronto de nuevo."
                    onClose={closeCierreSesionModal}
                />
            )}
        </div>
    );
}

export default HeroSection;


