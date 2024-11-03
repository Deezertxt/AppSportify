import React, { useState, useEffect } from "react";
import { getAudiobooks } from "../api/api";
<<<<<<< HEAD
import SearchBar from "../components/SearchBar";
=======
>>>>>>> origin/main
import Card from "../components/Card"; // Importar el componente Card
import {useNavigate} from 'react-router-dom';
import SearchBar from "../components/SearchBar";

<<<<<<< HEAD
=======

>>>>>>> origin/main
function Biblioteca() {
    const [audiobooks, setAudiobooks] = useState([]); // Estado para almacenar los audiolibros
    const navigate = useNavigate();
    
    // Cargar los audiolibros cuando el componente se monta
    useEffect(() => {
        const fetchAudiobooks = async () => {
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
            }
        };

        fetchAudiobooks();
    }, []);

    const handleCardClick = (id) => {
<<<<<<< HEAD
        navigate(`/Preview/${id}`); // Redirigir al reproductor del audiolibro
=======
        navigate(`/preview/${id}`); // Redirigir al reproductor del audiolibro
>>>>>>> origin/main
    };

    return (
        <>
            <div className="">
<<<<<<< HEAD
                
                <div className="px-20">
                    {/* <div className="pb-[5px]">Filtrar por: </div> */}
=======
                <div className="px-20">
>>>>>>> origin/main
                    <SearchBar/>
                </div>

                <div className="max-w-5xl mx-auto mt-8">
                    {Array.isArray(audiobooks) && audiobooks.length > 0 ? (
                        <div className="flex flex-wrap -m-4">
                            {audiobooks.map((audiobook) => (
                                <Card 
                                    key={audiobook.id}
                                    title={audiobook.title}
                                    author={audiobook.author}
                                    coverUrl={audiobook.coverUrl}
                                    duration={audiobook.duration} // Suponiendo que tienes una propiedad 'coverImage' para la URL de la portada
                                    onClick={() => handleCardClick(audiobook.id)} // Pasar la función onClick
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">No se encontraron audiolibros.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Biblioteca;