import React from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiStar } from "react-icons/fi";

// Función para capitalizar palabras
function convertir(cadena) {
    return cadena
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

const Card = ({ id, title, author, coverUrl, duration, averagerating }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/preview/${id}`);
    };

    return (
        <div
            id={`card-${id}`}
            className="group relative w-full bg-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
            onClick={handleCardClick}
        >
            {/* Imagen de portada */}
            <div
                id={`card-imagen-${id}`}
                className="w-full h-96">
                <img
                    src={coverUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
                />
            </div>

            {/* Capa de información en hover */}
            <div
                id={`card-info-${id}`}
                className="absolute inset-0 bg-slate-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3
                    id={`card-titulo-${id}`}
                    className="text-white text-lg font-semibold truncate">
                    {convertir(title)}
                </h3>
                <p
                    id={`card-autor-${id}`}
                    className="text-gray-300 text-sm truncate">
                    {convertir(author)}</p>
                <div
                    id={`card-duracion-${id}`}
                    className="flex items-center text-gray-200 text-xs mt-2">
                    <FiClock className="mr-1" />
                    <span>{duration}</span>
                </div>
                <div
                    id={`card-rating-${id}`}
                    className="flex items-center text-yellow-400 text-xs mt-1 ">
                    <FiStar className="mr-1 fill-yellow-400" />
                    <span>{averagerating}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
