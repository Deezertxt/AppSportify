import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserLibraryCategory } from "../api/api";
import Card from "../components/cards/Card";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../context/authContext"; // Importa el contexto de autenticación
import Breadcrumb from "../components/Breadcrumb";

const TodoBiblioteca = () => {
    const { user } = useAuth(); // Obtén el usuario desde el contexto de autenticación
    const userId = user?.userId; // Asegúrate de que el userId esté disponible
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get("filter"); // "saved" o "finished"

    const [audiobooks, setAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return; // Si no hay usuario, no hace nada

        const fetchAudiobooks = async () => {
            setLoading(true);
            try {
                const response = await getUserLibraryCategory(userId, filter);
                const data = response?.data?.[filter] || {};
                setAudiobooks(data.audiobooks || []);
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAudiobooks();
    }, [filter, userId]);

    return (
        <div className="max-w-7xl mx-auto mt-8">
            <Breadcrumb />
            <h1 className="text-3xl font-bold mb-6">
                {filter === "saved" ? "Guardados" : "Terminados"}
            </h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500" />
                    <span className="ml-2 text-gray-500">Cargando audiolibros...</span>
                </div>
            ) : audiobooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {audiobooks.map((audiobook) => (
                        <Card
                            key={audiobook.id}
                            id={audiobook.id}
                            title={audiobook.title}
                            author={audiobook.author}
                            coverUrl={audiobook.coverUrl}
                            duration={audiobook.duration}
                            averagerating={audiobook.averageRating}
                            onClick={() => navigate(`/preview/${audiobook.id}`)}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">No se encontraron audiolibros en esta categoría.</p>
            )}
        </div>
    );
};

export default TodoBiblioteca;
