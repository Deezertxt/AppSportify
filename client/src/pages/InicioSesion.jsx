import React, { useState } from "react"
import ModalInicioSesion from "../components/modalInicioSesion";

const InicioSesion = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <button 
            onClick={openModal}
            className="bg-blue-600 text-white p-4 rounded-lg"> 
            Iniciar Sesion 
            </button>
            <ModalInicioSesion isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
};

export default InicioSesion;