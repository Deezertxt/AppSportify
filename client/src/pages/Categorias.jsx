import React, { useState, useEffect } from "react";
import { getAudiobooksByCategory } from "../api/api";
import Card from "../components/cards/Card";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import Breadcrumb from "../components/Breadcrumb"; // Importar el componente Breadcrumb
import { AiOutlineLoading3Quarters } from "react-icons/ai";


function Categorias() {
    const { id } = useParams();
    const [audiobooks, setAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAudiobooks = async () => {
            setLoading(true);
            try {
                const response = await getAudiobooksByCategory(id);
                if (Array.isArray(response.data)) {
                    const sortedAudiobooks = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setAudiobooks(sortedAudiobooks);
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]);
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAudiobooks();
    }, [id]);

    const handleCardClick = (audiobookId) => {
        navigate(`/preview/${audiobookId}`);
    };

    return (
        <div className="px-6 py-4">

            <div className="mb-4">
                <SearchBar />
            </div>

            <Breadcrumb />

            {/* Contenido principal */}
            <div className="max-w-5xl mx-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500" />
                        <span className="ml-2 text-gray-500">Cargando audiolibros...</span>
                    </div>
                ) : audiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4 gap-4">
                        {audiobooks.map((audiobook) => (
                            <div key={audiobook.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                                <Card
                                    id={audiobook.id}
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
                    <p className="text-center">No se encontraron audiolibros en esta categoría.</p>
                )}
            </div>
        </div>
    );
}

export default Categorias;
