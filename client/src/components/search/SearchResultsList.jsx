import React from "react";
import { useNavigate } from "react-router-dom";

export const SearchResultsList = ({ results, setInput, setResults }) => {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`); // Redirigir al reproductor del audiolibro
        setInput(""); // Limpiar el input
        setResults([]); // Limpiar los resultados después de hacer clic
    };

    return (
        <div
            className="flex items-center gap-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleCardClick(results.id)}
        >
            {/* Portada */}
            <div id="portada" className="flex-shrink-0">
                <img
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                    src={results.coverUrl}
                    alt={`Portada de ${results.title}`} // Alt para accesibilidad
                />
            </div>

            {/* Información */}
            <div id="info" className="flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white truncate">
                    {results.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                    Autor: {results.author}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {results.duration}
                </p>
            </div>
        </div>
    );
};
