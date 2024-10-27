import React, { useState } from "react";
import CardAdmin from "../components/CardAdmin";

import FormModal from "../components/FormModal";

function PanelAdmin() {
    // Estado para controlar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Funciones para abrir y cerrar el modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="text-3xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">
                Panel de Administración
            </div>
            <div className="text-xl font-semibold text-gray-800 mb-4">
                Lista de audiolibros 
            </div>

            <div className="card-row grid grid-cols-6 items-center border-b border-gray-300 py-4 ">
                {/* Encabezados de las columnas */}
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-16">Portada</div>
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1">Titulo</div>
                <div className="description text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1]">Descripcion</div>
                <div className="author text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-2">Autor</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ">Categoria</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-6">Accion</div>
            </div>

           
            <CardAdmin />
            <CardAdmin />

        
            
            {/* Modal de Registro */}
            <FormModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}

export default PanelAdmin;
