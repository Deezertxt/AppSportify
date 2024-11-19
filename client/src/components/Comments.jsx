import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { getFeedbacks } from "../api/api";
import { applyActionCode } from "firebase/auth";

export const Comments = ({ currentBookId, currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const [lim, setLim] = useState(2);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getFeedbacks(currentBookId);
                if (Array.isArray(response.data)) {
                    setBackendComments(response.data);
                    console.log("Commentarios del book:    ", response.data);
                } else {
                    console.error(
                        "La respuesta no es un array:",
                        response.data
                    );
                    setBackendComments([]); // Estado vacío en caso de error
                }
            } catch (error) {
                console.error("Error fetching commentarios:", error);
                setBackendComments([]); // Estado vacío en caso de error
            }
        };
        fetchComments();
    }, [currentBookId]);

    const verMas = () => {
        setLim((prevLim) => prevLim + 4);
    };

    return (
        <div
            id="comments"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg"
        >
            <div id="comments-container" className="h-auto rounded-xl">
                <div className="text-xl font-bold">Reseñas: </div>
                {backendComments.length > 0 ? (
                    <>
                        {/* Mostrar los comentarios hasta el límite actual */}
                        {backendComments.slice(0, lim).map((rootComment) => (
                            <Comment
                                key={rootComment.id}
                                comment={rootComment}
                                currentUser={currentUserId}
                            />
                        ))}

                        {/* Botón "Ver más" si hay más comentarios que mostrar */}
                        {lim < backendComments.length && (
                            <button
                                onClick={verMas}
                                className="hover:underline cursor-pointer text-blue-600"
                            >
                                Ver más
                            </button>
                        )}
                    </>
                ) : (
                    <p>No hay comentarios aún.</p>
                )}
            </div>
        </div>
    );
};
