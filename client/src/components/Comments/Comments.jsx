import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { getFeedbacks } from "../../api/api";

export const Comments = ({ currentBookId, currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5); // Número de comentarios visibles inicialmente
    const [sortOrder, setSortOrder] = useState("recent"); // Orden inicial: más likes

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getFeedbacks(currentBookId);
                if (Array.isArray(response.data)) {
                    setBackendComments(response.data);
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setBackendComments([]);
                }
            } catch (error) {
                console.error("Error fetching comentarios:", error);
                setBackendComments([]);
            }
        };
        fetchComments();
    }, [currentBookId]);

    // Ordenar comentarios según la opción seleccionada
    const sortedComments = backendComments.slice().sort((a, b) => {
        if (sortOrder === "mostLiked") return b.likes - a.likes; // Ordenar por likes
        if (sortOrder === "recent") return new Date(b.createdAt) - new Date(a.createdAt); // Ordenar por fecha
        return 0;
    });

    // Comentarios visibles según el contador actual
    const visibleComments = sortedComments.slice(0, visibleCount);

    // Manejar el botón "Ver más"
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5); // Mostrar 5 comentarios más
    };

    return (
        <div id="comments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 rounded-lg">
            <div id="comments-container" className="h-auto rounded-xl">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="text-xl font-bold">Reseñas:</div>
                    {/* Opciones de orden */}
                    <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-4 mt-4 sm:mt-0">
                        <button
                            onClick={() => setSortOrder("mostLiked")}
                            className={`px-4 py-2 border rounded-lg text-sm font-semibold ${sortOrder === "mostLiked" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400"}`}
                        >
                            Más populares
                        </button>
                        <button
                            onClick={() => setSortOrder("recent")}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold ${sortOrder === "recent" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 hover:bg-blue-300"}`}
                        >
                            Más recientes
                        </button>
                    </div>
                </div>

                {/* Lista de comentarios */}
                <div className="comments-list space-y-4">
                    {visibleComments.map((rootComment) => (
                        <Comment key={rootComment.id} comment={rootComment} currentUser={currentUserId} />
                    ))}
                </div>

                {/* Botón "Ver más" */}
                {visibleCount < sortedComments.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
                    >
                        Ver más
                    </button>
                )}
            </div>
        </div>

    );
};
