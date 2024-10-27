import React, { useState, useEffect } from "react";  
import CardAdmin from "../components/CardAdmin";  
import { getAudiobooks } from "../api/api";
import { getCategories } from "../api/api";
import FormModal from "../components/FormModal";
 

function PanelAdmin() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [audiobooks, setAudiobooks] = useState([]); 
    const [categories, setCategories] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [audiobookResponse, categoryResponse] = await Promise.all([
                    getAudiobooks(),
                    getCategories(),
                ]);

                // Verificamos y establecemos los audiolibros
                if (Array.isArray(audiobookResponse.data)) {
                    setAudiobooks(audiobookResponse.data);
                } else {
                    console.error("La respuesta de audiolibros no es un array:", audiobookResponse.data);
                }

                // Verificamos y establecemos las categorías
                if (Array.isArray(categoryResponse.data)) {
                    setCategories(categoryResponse.data);
                } else {
                    console.error("La respuesta de categorías no es un array:", categoryResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        console.log("Eliminar audiolibro con id:", id);
    };

    // Mapeo de categorías por ID para facilitar la búsqueda
    const categoriesMap = Object.fromEntries(categories.map(category => [category.id, category.name]));

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
                <div className="title text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-10">Portada</div>
                <div className="title text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ">Título</div>
                <div className="description text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-1 ">Autor</div>
                <div className="author text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-8 ">Descripción</div>
                <div className="category text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-14 ">Categoría</div>
                <div className="category text-gray-900 font-bold text-sm truncate max-w-xs overflow-hidden text-ellipsis ml-20">Acción</div>
            </div>

            
            {audiobooks.map((audiobook) => (
                <CardAdmin
                    key={audiobook.id}  
                    title={audiobook.title}
                    author={audiobook.author}
                    description={audiobook.description}
                    coverUrl={audiobook.coverUrl}
                    category={categoriesMap[audiobook.categoryId]}
                    onDelete={() => handleDelete(audiobook.id)}  
                />
            ))}
 
            <FormModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}

export default PanelAdmin;
