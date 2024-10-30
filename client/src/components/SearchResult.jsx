import React from "react";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result }) => {
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        navigate(`/reproductor/${id}`); // Redirigir al reproductor del audiolibro
    };

    
    return (
        <div
            className="px-5 py-2 hover:bg-[#efefef] flex"
            onClick={() => handleCardClick(result.id)}
        >
            <div id="portada">
                <img className="w-20 h-20 rounded-xl" src={result.coverUrl} />
            </div>
            <div id="info" className="flex-col pl-5">
                <div className="font-bold text-xl">{result.title}</div>
                <div className="text-base">Autor: {result.author}</div>
            </div>
        </div>
    );
};
