import React, { useEffect, useState } from "react";
import { Comment } from "./Comment";
import { getFeedbacks } from "../api/api";

export const Comments = ({ currentBookId, currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getFeedbacks(currentBookId)
                if (Array.isArray(response.data)) {
                    setBackendComments(response.data)
                    console.log("Commentarios del book:    ", response.data);
                    
                }else {
                    console.error("La respuesta no es un array:", response.data);
                    setBackendComments([]); // Estado vacío en caso de error
                }
            } catch (error) {
                console.error("Error fetching commentarios:", error);
                setBackendComments([]); // Estado vacío en caso de error
            }
        };
        fetchComments();
    }, []);
    return (
        <div
            id="comments"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg"
        >
            <div id="comments-container" className="h-auto rounded-xl">
                <div className="text-xl font-bold">Reseñas: </div>
                {backendComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} currentUser={currentUserId} />
                ))}
            </div>
        </div>
    );
};
