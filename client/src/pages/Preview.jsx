import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAudiobookById } from '../api/api'; // Asegúrate de tener esta función en tu API
import { FaArrowLeft } from 'react-icons/fa';

function Preview() {
    const { id } = useParams(); // Obtener el ID desde la URL
    const navigate = useNavigate();
    const [audiobook, setAudiobook] = useState(null); // Estado para almacenar los detalles del audiolibro

    // Cargar el audiolibro cuando se monta el componente o cambia el ID
    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id); // Llamar a la API con el ID
                setAudiobook(response.data); // Asignar los datos al estado
            } catch (error) {
                console.error("Error fetching audiobook:", error);
            }
        };
        fetchAudiobook();
    }, [id]);

    if (!audiobook) {
        return <p className="text-center">Cargando información del audiolibro...</p>; // Mostrar mensaje de carga
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-4xl mx-auto p-4">
                {/* Botón de retroceso */}
                <button
                    className="text-black font-bold mb-4 flex items-center"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft className="mr-2" />
                    Volver
                </button>

                {/* Información del libro */}
                <section className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <img
                        src={audiobook.coverUrl}
                        alt="Book Cover"
                        className="w-full md:w-48 md:h-64 transition-transform duration-300 hover:scale-105 object-cover"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">{audiobook.title}</h2>
                        <p className="text-lg font-semibold">Autor:</p>
                        <p className="text-lg text-gray-500 font-semibold">{audiobook.author}</p>
                        <div className="flex space-x-4 mt-2 text-gray-700">
                            <span>⏱ {audiobook.duration}</span>
                        </div>
                    </div>
                </section>

                {/* Botones de acción */}
                <Actions audiobookId={id} />

                {/* Descripción */}
                <section className="mt-4">
                    <h3 className="text-lg font-semibold">Descripción</h3>
                    <p className="text-gray-700 mt-2">
                        {audiobook.description}
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Preview;
