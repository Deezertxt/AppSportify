import React, { useState, useEffect } from "react";
import Card from "../cards/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getAudiobooks } from "../../api/api";
import Breadcrumb from "../Breadcrumb";

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


    return (
        <div>
            <div className="px-20">
                <SearchBar />
                <div className="px-4"><Breadcrumb /></div>

            </div>
            <div className="flex items-center pl-24">Filtrar por:</div>
            <div className="flex items-center mb-4 pl-24">
                <button
                    onClick={() => setFilter("Todo")}
                    className={`px-4 py-2 mr-2 text-white ${filter === "Todo" ? "bg-blue-500 " : "bg-gray-500"}`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setFilter("Título")}
                    className={`px-4 py-2 mr-2 text-white ${filter === "Título" ? "bg-blue-500 " : "bg-gray-500"}`}
                >
                    Título
                </button>
                <button
                    onClick={() => setFilter("Autor")}
                    className={`px-4 py-2 text-white ${filter === "Autor" ? "bg-blue-500 " : "bg-gray-500"}`}
                >
                    Autor
                </button>
            </div>
            <div className="max-w-7xl mx-auto mt-8 px-4 md:px-20">
                {filteredAudiobooks.length > 0 ? (
                    // Contenedor de las cards en grid con responsive
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredAudiobooks.map((audiobook) => {
                            return (
                                <div className="w-full p-4" key={audiobook.id}>
                                    <Card
                                        id={audiobook.id}  // Pasa el id correctamente
                                        title={audiobook.title.trim()}
                                        author={audiobook.author.trim()}
                                        coverUrl={audiobook.coverUrl}
                                        duration={audiobook.duration}
                                        averagerating={audiobook.averageRating}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-[30px] font-bold py-5">No se encontraron resultados.</p>
                )}
            </div>

        </div>
    );
};

export default SearchResults;
