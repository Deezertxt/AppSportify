import React, { useState, useEffect } from "react";  
import CardAdmin from "../components/CardAdmin";  
import { getAudiobooks } from "../api/api";
import FormModal from "../components/FormModal";
import { deleteAudiobook } from "../api/api";

function PanelAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [audiobooks, setAudiobooks] = useState([]); // Declarar estado para audiolibros

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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

    const handleDelete = (id) => {
        console.log("Eliminar audiolibro con id:", id);
        // aun no puse lo de eliminar xd
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
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-10">Portada</div>
                <div className="title text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ">Título</div>
                <div className="description text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1 ">Autor</div>
                <div className="author text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-8 ">Descripción</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-14 ">Categoría</div>
                <div className="category text-gray-900 font-semibold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-20">Acción</div>
            </div>

            
            {audiobooks.map((audiobook) => (
                <CardAdmin
                    key={audiobook.id}  
                    title={audiobook.title}
                    author={audiobook.author}
                    description={audiobook.description}
                    coverUrl={audiobook.coverUrl}
                    category={audiobook.category}
                    onDelete={() => handleDelete(audiobook.id)}  
                />
            ))}
 
            <FormModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}

export default PanelAdmin;
