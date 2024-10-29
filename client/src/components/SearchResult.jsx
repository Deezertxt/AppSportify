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
                <img className="w-20 h-20" src={result.coverUrl} />
            </div>
            <div id="info" className="flex-col">
                <div>{result.title}</div>
                <div>{result.author}</div>
            </div>
        </div>
    );
};
