import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BarLoaderWrapper from "./BarLoader";
const SearchResults = () => {
    const [audiobooks, setAudiobooks] = useState([]);
    const [filter, setFilter] = useState("Todo"); // Estado para controlar el filtro seleccionado
    const location = useLocation();
    const entrada = location.state?.input || "";
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAudiobooks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(
                    "http://localhost:3000/api/audiobook/get/"
                );
                const json = await response.json();
                const filteredResults = json.filter((audiobook) => {
                    if (filter === "Título") {
                        return audiobook.title
                            ?.toLowerCase()
                            .includes(entrada.toLowerCase());
                    } else if (filter === "Autor") {
                        return audiobook.author
                            ?.toLowerCase()
                            .includes(entrada.toLowerCase());
                    } else {
                        // Filtro "Todo" muestra coincidencias en título o autor
                        return (
                            audiobook.title
                                ?.toLowerCase()
                                .includes(entrada.toLowerCase()) ||
                            audiobook.author
                                ?.toLowerCase()
                                .includes(entrada.toLowerCase())
                        );
                    }
                });
                setAudiobooks(filteredResults);
            } catch (error) {
                console.error("Error al obtener audiolibros:", error);
            }
            setIsLoading(false);
        };

        fetchAudiobooks();
    }, [entrada, filter]);

    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`);
    };

    return (
        <div>
            <BarLoaderWrapper isLoading={isLoading} />
            <div className="px-20">
                <SearchBar />
            </div>
            <div className="flex items-center pl-24">Filtrar por:</div>
            <div className="flex items-center mb-4 pl-24">
                
                <button
                    onClick={() => setFilter("Todo")}
                    className={`px-4 py-2 mr-2 ${
                        filter === "Todo"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter("Título")}
                    className={`px-4 py-2 mr-2 ${
                        filter === "Título"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Título
                </button>
                <button
                    onClick={() => setFilter("Autor")}
                    className={`px-4 py-2 ${
                        filter === "Autor"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Autor
                </button>
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                {/* Botones de filtro */}
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
                        Cargando...
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
