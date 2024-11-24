import React from "react";
import { FiChevronRight, FiPlus, FiTrash } from "react-icons/fi";

const ModalCard = ({ onDetails, onAddToRecommended, onRemoveFromSaved }) => {
    return (
        <div className="absolute top-0 right-0 mt-10 bg-white p-3 shadow-md rounded-md z-50 w-40">
            <button
                onClick={onDetails}
                className="w-full flex items-center gap-2 text-left text-blue-600 hover:text-blue-800 py-1"
            >
                <FiChevronRight /> Ver detalles
            </button>
            <button
                onClick={onAddToRecommended}
                className="w-full flex items-center gap-2 text-left text-green-600 hover:text-green-800 py-1"
            >
                <FiPlus /> Recomendados
            </button>
            <button
                onClick={onRemoveFromSaved}
                className="w-full flex items-center gap-2 text-left text-red-600 hover:text-red-800 py-1"
            >
                <FiTrash /> Eliminar
            </button>
        </div>
    );
};

export default ModalCard;
