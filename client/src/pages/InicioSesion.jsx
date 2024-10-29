import React, { useState } from "react";
import Modal from "../components/Modal";
import ModalInicioSesion from "../components/ModalInicioSesion"; // Asegúrate de que esta ruta sea correcta

function InicioSesion() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <button
                onClick={openModal}
                className="bg-blue-600 text-white p-3 rounded-md"
            >
                Iniciar Sesión
            </button>

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <ModalInicioSesion closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default InicioSesion;
