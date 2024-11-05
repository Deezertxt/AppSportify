import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SearchResults = () => {
    const [audiobooks, setAudiobooks] = useState([]);
    const [filter, setFilter] = useState("Todo"); // Estado para controlar el filtro seleccionado
    const location = useLocation();
    const entrada = location.state?.input || ""; 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/audiobook/get/");
                const json = await response.json();
                const filteredResults = json.filter((audiobook) => {
                    if (filter === "Título") {
                        return audiobook.title?.toLowerCase().includes(entrada.toLowerCase());
                    } else if (filter === "Autor") {
                        return audiobook.author?.toLowerCase().includes(entrada.toLowerCase());
                    } else {
                        // Filtro "Todo" muestra coincidencias en título o autor
                        return (
                            (audiobook.title?.toLowerCase().includes(entrada.toLowerCase())) ||
                            (audiobook.author?.toLowerCase().includes(entrada.toLowerCase()))
                        );
                    }
                });
                setAudiobooks(filteredResults);
            } catch (error) {
                console.error("Error al obtener audiolibros:", error);
            }
        };

        fetchAudiobooks();
    }, [entrada, filter]);

    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`);
    };

    return (
        <div>
            <div className="px-20">
                <SearchBar />
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                {/* Botones de filtro */}
                <div className="flex justify-start mb-4">
                    <button
                        onClick={() => setFilter("Todo")}
                        className={`px-4 py-2 mr-2 ${filter === "Todo" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Todo
                    </button>
                    <button
                        onClick={() => setFilter("Título")}
                        className={`px-4 py-2 mr-2 ${filter === "Título" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Título
                    </button>
                    <button
                        onClick={() => setFilter("Autor")}
                        className={`px-4 py-2 mr-2 ${filter === "Autor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Autor
                    </button>
                    <button
                        onClick={() => setFilter("Categoria")}
                        className={`px-4 py-2 ${filter === "Autor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        Categoria
                    </button>
                </div>
                
                {Array.isArray(audiobooks) && audiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4">
                        {audiobooks.map((audiobook) => (
                            <Card
                                key={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl}
                                onClick={() => handleCardClick(audiobook.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[30px] font-bold py-5">
                        No se encontraron audiolibros.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;