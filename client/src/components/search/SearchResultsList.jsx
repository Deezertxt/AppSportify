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
        <div className="px-5 py-2 hover:bg-[#efefef] flex" onClick={() => handleCardClick(results.id)}>
            <div id="portada">
                <img
                    className="w-20 h-20 rounded-xl"
                    src={results.coverUrl}
                    alt={`Portada de ${results.title}`} // Añadir alt por accesibilidad
                />
            </div>
            <div id="info" className="flex-col pl-5">
                <div className="font-bold text-xl">{results.title}</div>
                <div className="text-base">Autor: {results.author}</div>
                <div className="text-base">{results.duration}</div>
            </div>
        </div>
    );
};

