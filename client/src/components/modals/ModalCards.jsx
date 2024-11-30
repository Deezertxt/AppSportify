import React from "react";
import { FiChevronRight, FiPlus, FiTrash } from "react-icons/fi";

const ModalCard = ({ onDetails, onAddToRecommended, onRemoveFromSaved }) => {
    return (
        <div
            id={`modal-card-${id}`}
            className="absolute top-0 right-0 mt-10 bg-white p-3 shadow-md rounded-md z-50 w-40">
            <button
                id={`detalles-boton-${id}`}
                onClick={onDetails}
                className="w-full flex items-center gap-2 text-left text-blue-600 hover:text-blue-800 py-1"
            >
                <FiChevronRight /> Ver detalles
            </button>
            <button
                id={`add-recomendados-boton-${id}`}
                onClick={onAddToRecommended}
                className="w-full flex items-center gap-2 text-left text-green-600 hover:text-green-800 py-1"
            >
                <FiPlus /> Recomendados
            </button>
            <button
                id={`borrar-boton-${id}`}
                onClick={() => openConfirmModal(activeModal?.id)}
                className="w-full flex items-center gap-2 text-left text-red-600 hover:text-red-800 py-1"
            >
                <FiTrash /> Eliminar
            </button>
        </div>
    );
};

export default ModalCard;
