import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BarLoaderWrapper from "./BarLoader";
import { getAudiobooks } from "../api/api";

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const input = location.state?.input || ""; // Término de búsqueda inicial
    const [audiobooks, setAudiobooks] = useState(location.state?.results || []);
    const [filteredAudiobooks, setFilteredAudiobooks] = useState([]);
    const [filter, setFilter] = useState("Todo");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!audiobooks.length) {
            const fetchAudiobooks = async () => {
                setIsLoading(true);
                try {
                    const response = await getAudiobooks();
                    const data = Array.isArray(response) ? response : response.data; // Asegura que sea un array
                    setAudiobooks(data);
                    setFilteredAudiobooks(data);
                } catch (error) {
                    console.error("Error al obtener audiolibros:", error);
                    setAudiobooks([]); // Estado vacío en caso de error
                    setFilteredAudiobooks([]);
                }
                setIsLoading(false);
            };
            
            fetchAudiobooks();
        } else {
            setFilteredAudiobooks(audiobooks);
        }
    }, [audiobooks]);

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
            <BarLoaderWrapper isLoading={isLoading} />
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
                {isLoading ? (
                    <p className="text-center text-[30px] font-bold py-5">Cargando...</p>
                ) : filteredAudiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4">
                        {filteredAudiobooks.map((audiobook) => (
                            <Card
                                key={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl}
                                duration={audiobook.duration}
                                onClick={() => handleCardClick(audiobook.id)}
                            />
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
