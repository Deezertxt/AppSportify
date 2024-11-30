
import React from "react";

const ModalConfirmacionBorrado = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div
            id={`modal-confirmacion-${id}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2
                    id={`modal-titulo-${id}`}
                    className="text-xl font-semibold text-gray-800">{title}</h2>
                <p
                    id={`modal-mensaje-${id}`}
                    className="mt-4 text-gray-600">{message}</p>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        id={`cancel-boton-${id}`}
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        id={`confirmar-boton-${id}`}
                        onClick={onRemoveFromSaved}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacionBorrado;


