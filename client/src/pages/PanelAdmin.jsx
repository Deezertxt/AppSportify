import React, { useState, useEffect } from "react";  
import CardAdmin from "../components/CardAdmin";  
import { getAudiobooks, deleteAudiobook } from "../api/api";
import FormModal from "../components/FormModal";
import { FaTimes } from "react-icons/fa"; 

function PanelAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [audiobooks, setAudiobooks] = useState([]); 
    const [audiobookToDelete, setAudiobookToDelete] = useState(null); 

    const openModal = (id) => {
        setIsModalOpen(true);
        setAudiobookToDelete(id); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAudiobookToDelete(null); 
    };

    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await getAudiobooks();  
                if (Array.isArray(response.data)) {
                    setAudiobooks(response.data);  
                } else {
                    console.error("La respuesta no es un array:", response.data);
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
            }
        };

        fetchAudiobooks();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteAudiobook(audiobookToDelete); 
            setAudiobooks((prev) => prev.filter((audiobook) => audiobook.id !== audiobookToDelete)); 
            closeModal(); 
        } catch (error) {
            console.error("Error deleting audiobook:", error);
        }
    };

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
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1">Título</div>
                <div className="description text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1">Descripción</div>
                <div className="author text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-2">Autor</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ">Categoría</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-6">Acción</div>
            </div>

            {audiobooks.map((audiobook) => (
                <CardAdmin
                    key={audiobook.id}  
                    title={audiobook.title}
                    author={audiobook.author}
                    description={audiobook.description}
                    coverUrl={audiobook.coverUrl}
                    category={audiobook.category}
                    onDelete={() => openModal(audiobook.id)}  // Abre el modal con el ID del audiolibro
                />
            ))}

            <FormModal isOpen={isModalOpen} closeModal={closeModal} />
        
            {/* Modal de Confirmación */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg font-semibold text-[#213A57]">¿Está seguro de que quiere eliminar este audiolibro?</p>
                        <div className="mt-4">
                            <button
                                onClick={handleDelete} // Elimina el audiolibro al confirmar
                                className="bg-[#0B6477] text-white py-2 px-4 rounded-lg hover:bg-[#14919B] mr-2"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                            >
                                Cancelar
                            </button>
                        </div>
                        <button
                            onClick={closeModal} 
                            className="absolute top-2 right-2 text-gray-500"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PanelAdmin;
