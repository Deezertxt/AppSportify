import React, { useState } from "react";
import Modal from "../components/Modal";
import ModalInicioSesion from "../components/ModalInicioSesion";
import ModalRegistro from "../components/ModalRegistro"; // Asegúrate de que esta ruta sea correcta

function InicioSesion() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Controla si se muestra el formulario de inicio de sesión o de registro

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Función para alternar entre el formulario de inicio de sesión y el de registro
    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button
                onClick={() => {
                    openModal();
                    setIsLogin(true); // Abre el modal en el formulario de inicio de sesión por defecto
                }}
                className="bg-blue-600 text-white p-3 rounded-md"
            >
                Iniciar Sesión
            </button>

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                {isLogin ? (
                    <ModalInicioSesion closeModal={closeModal} openRegister={toggleForm} />
                ) : (
                    <ModalRegistro closeModal={closeModal} openLogin={toggleForm} />
                )}
            </Modal>
        </div>
    );
}

export default InicioSesion;
