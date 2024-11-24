import React, { useState, useEffect } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import { likeFeedback } from "../../api/api";

export const Comment = ({ comment, currentUser }) => {
    const [contador, setContador] = useState(comment.likes || 0);
    const [timeAgo, setTimeAgo] = useState("");
    const [hasLiked, setHasLiked] = useState(false);

    const handleClickLike = async () => {
        if (hasLiked) return;

        try {
            await likeFeedback(comment.id);
            setContador(contador + 1);
            setHasLiked(true);
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const createdAt = new Date(timestamp);
        const seconds = Math.floor((now - createdAt) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (seconds < 60) return `Hace ${seconds} segundo${seconds > 1 ? "s" : ""}`;
        if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? "s" : ""}`;
        if (hours < 24) return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
        if (days < 7) return `Hace ${days} día${days > 1 ? "s" : ""}`;
        return createdAt.toLocaleDateString();
    };

    useEffect(() => {
        setTimeAgo(formatTimeAgo(comment.createdAt));
        if (Array.isArray(comment.likes)) {
            setHasLiked(comment.likes.includes(currentUser.id));
        } else {
            setHasLiked(false);
        }
    }, [comment.createdAt, comment.likes, currentUser.id]);

    return (
        <div className="mb-6 p-4 border rounded-lg shadow-md flex flex-col space-y-4 transition hover:shadow-lg">
            {/* Header */}
            <div className="flex items-start space-x-4">
                <Link to={`/perfil/${comment.user.id}`} className="flex-shrink-0">
                    <img
                        src={comment.user.profilePicUrl}
                        alt="profile"
                        className="w-12 h-12 rounded-full border object-cover"
                    />
                </Link>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <Link
                            to={`/perfil/${comment.user.id}`}
                            className="text-sm font-semibold hover:text-teal-600 transition break-words max-w-full"
                        >
                            {comment.user.username}
                        </Link>

                        <span className="text-sm">{timeAgo}</span>
                    </div>
                    <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span
                                key={index}
                                className={`text-lg ${index < comment.rating ? "text-yellow-500" : "text-gray-300"}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                </div>
            </div>

            {/* Comment Text */}
            <p className="ml-16 text-sm sm:text-base break-words overflow-wrap word-break">
                {comment.comment}
            </p>

            {/* Like Button */}
            <div className="flex items-center space-x-2 ml-16">
                <button
                    onClick={handleClickLike}
                    className={`flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-md border transition 
                    ${hasLiked ? "bg-teal-100 text-teal-600 border-teal-200" : " text-gray-500 border-gray-300"}
                    hover:bg-teal-200 hover:text-teal-700`}
                    disabled={hasLiked}
                >
                    {hasLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
                    <span>{contador}</span>
                </button>
            </div>
        </div>
    );
};