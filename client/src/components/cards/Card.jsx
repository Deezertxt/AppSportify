import React from "react";
import { useNavigate } from 'react-router-dom';
import { FiClock, FiStar } from "react-icons/fi";

// Función para capitalizar las palabras del título
function convertir(cadena) {
    return cadena
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function Card({ id, title, author, description, coverUrl, duration, averagerating }) {
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        navigate(`/preview/${id}`); // Redirige al reproductor del audiolibro usando el id
    };

    return (
        <div className="p-4">
            <div
                className="card h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={handleCardClick}
            >
                {/* Contenedor de imagen */}
                <div className="image-container flex justify-center items-center h-60 bg-gray-100">
                    <img
                        className="card-image h-full w-auto object-contain"
                        src={coverUrl}
                        alt="audiobook cover"
                    />
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-4">
                    <h1 className="text-xl font-semibold text-gray-900 mb-2 truncate">{convertir(title)}</h1>
                    <h2 className="text-sm font-medium text-gray-500 mb-1">{author}</h2>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-3">{description}</p>

                    {/* Duración y calificación */}
                    <div className="flex items-center justify-start text-gray-600 space-x-4">
                        <div className="flex items-center text-sm">
                            <FiClock className="mr-1" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <FiStar className="mr-1" />
                            <span>{averagerating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
