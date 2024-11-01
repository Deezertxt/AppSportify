import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

export const SearchResults = () => {
    const [audiobooks, setAudiobooks] = useState([]);
    const [filter, setFilter] = useState("all"); // Estado del filtro: "all", "title", "author"
    const location = useLocation();
    const entrada = location.state?.input || ""; // Entrada de búsqueda
    const navigate = useNavigate();

    useEffect(() => {
        // Llama a la API y filtra los resultados
        const fetchAudiobooks = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/audiobook/get/");
                const json = await response.json();

                // Filtrar según el filtro activo
                const results = json.filter((audiobook) => {
                    if (filter === "title") {
                        return audiobook.title?.toLowerCase().includes(entrada.toLowerCase());
                    } else if (filter === "author") {
                        return audiobook.author?.toLowerCase().includes(entrada.toLowerCase());
                    }
                    return (
                        audiobook.title?.toLowerCase().includes(entrada.toLowerCase()) ||
                        audiobook.author?.toLowerCase().includes(entrada.toLowerCase())
                    );
                });
                setAudiobooks(results);
            } catch (error) {
                console.error("Error al obtener audiolibros:", error);
            }
        };

        fetchAudiobooks();
    }, [entrada, filter]); // Refresca los resultados al cambiar el filtro o la entrada

    const handleCardClick = (id) => {
        navigate(`/Preview/${id}`); // Redirigir al reproductor del audiolibro
    };

    return (
        <div>
            <div className="px-20">
                <SearchBar />
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                {/* Botones de filtro */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter("title")}
                        className={`px-4 py-2 rounded ${filter === "title" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    >
                        Título
                    </button>
                    <button
                        onClick={() => setFilter("author")}
                        className={`px-4 py-2 rounded ${filter === "author" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                    >
                        Autor
                    </button>
                </div>

                {Array.isArray(audiobooks) && audiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4">
                        {audiobooks.map((audiobook) => (
                            <Card
                                key={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl} // Suponiendo que tienes una propiedad 'coverUrl' para la URL de la portada
                                onClick={() => handleCardClick(audiobook.id)} // Pasar la función onClick
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
