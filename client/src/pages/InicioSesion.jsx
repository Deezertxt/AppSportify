import React, { useState } from "react"
import ModalInicioSesion from "../components/ModalInicioSesion";

function InicioSesion(){
    const [isModalOpen, setIsModalOpen] = useState(false);   

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <ModalInicioSesion isOpen={isModalOpen} onClose={closeModal}/>
        </div>
    );
};

export default InicioSesion;