import React, { useState, useEffect } from "react";
import { getAudiobooks } from "../api/api";
import Card from "../components/cards/Card"; // Importar el componente Card
import { useNavigate } from 'react-router-dom';
import SearchBar from "../components/search/SearchBar";
import SkeletonCard from "../components/skeletons/SkeletonCard"; // Importar el SkeletonCard

function Inicio() {
    const [audiobooks, setAudiobooks] = useState([]); // Estado para almacenar los audiolibros
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const navigate = useNavigate();

    // Cargar los audiolibros cuando el componente se monta
    useEffect(() => {
        const fetchAudiobooks = async () => {
            setLoading(true); // Activar la carga
            try {
                const response = await getAudiobooks(); // Llamada a la API
                if (Array.isArray(response.data)) { // Verificar si la respuesta contiene un array
                    setAudiobooks(response.data); // Asignar los audiolibros
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]); // En caso de error, asegurar que el estado sea un array vacío
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]); // En caso de error, asegurar que el estado sea un array vacío
            } finally {
                setLoading(false); // Finalizar la carga
            }
        };

        fetchAudiobooks();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/preview/${id}`); // Redirigir al reproductor del audiolibro
    };

    return (
        <div className="px-4 md:px-20">
            <SearchBar />
            <div className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {loading ? (
                        // Mostrar SkeletonCard durante la carga
                        [...Array(4)].map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        audiobooks.map((audiobook) => (
                            <Card
                                key={audiobook.id}
                                id={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl}
                                duration={audiobook.duration}
                                averagerating={audiobook.averageRating}
                                onClick={() => handleCardClick(audiobook.id)} // Pasar la función onClick
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Inicio;
