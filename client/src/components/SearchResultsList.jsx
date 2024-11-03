import React from "react";
import { useNavigate } from "react-router-dom";
export const SearchResultsList = ({ results, setInput, setResults }) => {
    const navigate = useNavigate();
    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`); // Redirigir al reproductor del audiolibro
        setInput(""); //despues de dar click al libro limpio input y lista de coincidencias
        setResults([]);
    };
    return (
        <>
            <div className="">
                {Array.isArray(results) && results.length > 0 ? (
                    <p className="text-center text-[30px] font-bold py-5">
                        No se encontraron audiolibros.
                    </p>
                ) : (
                    <div>
                        <div
                            className="px-5 py-2 hover:bg-[#efefef] flex"
                            onClick={() => handleCardClick(results.id)}
                        >
                            <div id="portada">
                                <img
                                    className="w-20 h-20 rounded-xl"
                                    src={results.coverUrl}
                                />
                            </div>
                            <div id="info" className="flex-col pl-5">
                                <div className="font-bold text-xl">
                                    {results.title}
                                </div>
                                <div className="text-base">
                                    Autor: {results.author}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
