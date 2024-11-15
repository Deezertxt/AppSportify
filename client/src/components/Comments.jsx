import React, { useEffect, useState } from "react";
import { getComments as getCommentsApi } from "../api/userPrueba";
import { Comment } from "./Comment";
import { CommentsForm } from "./CommentsForm";

export const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
    );
    console.log("backendComments: ", backendComments);

    const addComment = (text, parentId) => {
        console.log("texto:  ", text);
    };

    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComments(data);
        });
    }, []);
    return (
        <div
            id="comments"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white rounded-lg"
        >
            <div id="comment-form-title" className="font-bold text-xl">Escribe una reseña:</div>
            <div>
                <CommentsForm submitLabel="Comentar" handleSubmit="addComment" />
            </div>
            <div id="comments-container" className="h-auto rounded-xl">
                <div className="text-xl font-bold">Reseñas: </div>
                {rootComments.map((rootComment) => (
                    <Comment key={rootComment.id} comment={rootComment} />
                ))}
            </div>
        </div>
    );
};
