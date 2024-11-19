import React, { useState, useEffect } from "react";
import Card from "../cards/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getAudiobooks } from "../../api/api";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const input = location.state?.input || ""; // Término de búsqueda inicial
    const [audiobooks, setAudiobooks] = useState(location.state?.results || []);
    const [filteredAudiobooks, setFilteredAudiobooks] = useState([]);
    const [filter, setFilter] = useState("Todo");
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        if (!isDataLoaded) {
            const fetchAudiobooks = async () => {
                setIsLoading(true);
                try {
                    const response = await getAudiobooks();
                    const data = Array.isArray(response) ? response : response.data; // Asegura que sea un array
                    setAudiobooks(data);
                    setFilteredAudiobooks(data);
                    setIsDataLoaded(true); // Marca como cargado para evitar futuras cargas innecesarias
                } catch (error) {
                    console.error("Error al obtener audiolibros:", error);
                    setAudiobooks([]); // Estado vacío en caso de error
                    setFilteredAudiobooks([]);
                }
                setIsLoading(false);
            };

            fetchAudiobooks();
        }
    }, [isDataLoaded]);

    // Filtrar audiolibros según el término de búsqueda y filtro
    useEffect(() => {
        if (Array.isArray(audiobooks)) {
            const searchValue = input.toLowerCase();
            const results = audiobooks.filter((audiobook) => {
                if (filter === "Título") {
                    return audiobook.title?.toLowerCase().includes(searchValue);
                } else if (filter === "Autor") {
                    return audiobook.author?.toLowerCase().includes(searchValue);
                } else {
                    return (
                        audiobook.title?.toLowerCase().includes(searchValue) ||
                        audiobook.author?.toLowerCase().includes(searchValue)
                    );
                }
            });
            setFilteredAudiobooks(results);
        } else {
            setFilteredAudiobooks([]); // O manejarlo como prefieras
        }
    }, [input, filter, audiobooks]);

    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`);
    };

    return (
        <div>
            <div className="px-20">
                <SearchBar />
            </div>
            <div className="flex items-center pl-24">Filtrar por:</div>
            <div className="flex items-center mb-4 pl-24">
                <button
                    onClick={() => setFilter("Todo")}
                    className={`px-4 py-2 mr-2 ${filter === "Todo" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter("Título")}
                    className={`px-4 py-2 mr-2 ${filter === "Título" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Título
                </button>
                <button
                    onClick={() => setFilter("Autor")}
                    className={`px-4 py-2 ${filter === "Autor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Autor
                </button>
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                {filteredAudiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4 gap-4">
                        {filteredAudiobooks.map((audiobook) => (
                            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4" key={audiobook.id}>
                                <Card
                                    key={audiobook.id}
                                    title={audiobook.title}
                                    author={audiobook.author}
                                    coverUrl={audiobook.coverUrl}
                                    duration={audiobook.duration}
                                    averagerating={audiobook.averageRating}
                                    onClick={() => handleCardClick(audiobook.id)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[30px] font-bold py-5">No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
