import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAudiobookById, createFeedback, checkUserFeedback } from "../api/api";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/ThemeContext";
import ModalReu from "../components/modals/ModalReu";

const Reseña = () => {
    const { id } = useParams();
    const { darkMode } = useTheme();
    const [rating, setRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [comment, setComment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Para bloquear el botón
    const [feedbackExists, setFeedbackExists] = useState(false); // Para bloquear la ruta si ya existe feedback
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user.userId;

    const prohibitedWords = ["maldición", "insulto", "grosería", "mierda"];

    const correctCommonMistakes = (text) => {
        const corrections = {
            "q": "que",
            "xq": "porque",
            "tbn": "también",
        };
        return text.split(" ").map((word) => corrections[word.toLowerCase()] || word).join(" ");
    };

    const validateComment = (text) => {
        if (!text.trim()) {
            setErrorMessage("Por favor, escribe un comentario.");
            return false;
        }
        if (prohibitedWords.some((word) => text.toLowerCase().includes(word))) {
            setErrorMessage("Por favor, evita el uso de lenguaje inapropiado.");
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleRating = (rate) => {
        setRating((prev) => (prev === rate ? null : rate)); // Resetear si se hace clic en la misma estrella
    };
    const handleMouseEnter = (rate) => setHoverRating(rate);
    const handleMouseLeave = () => setHoverRating(null);

    const handleCommentChange = (e) => {
        const rawText = e.target.value;
        const correctedText = correctCommonMistakes(rawText);
        setComment(correctedText);
        validateComment(correctedText);
    };

    const handleSubmit = async () => {
        if (!rating || !validateComment(comment) || isSubmitting) return;

        setIsSubmitting(true); // Bloquear el botón de envío

        const feedbackData = {
            userId,
            audiobookId: parseInt(id, 10),
            comment,
            rating,
        };

        try {
            const response = await createFeedback(feedbackData);
            if (response.status === 200) {
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate(`/inicio`);
                }, 3000);
            } else {
                console.error("Error al enviar la reseña");
            }
        } catch (error) {
            console.error("Error al enviar la reseña:", error);
        } finally {
            setIsSubmitting(false); // Desbloquear el botón si hay error
        }
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await getAudiobookById(id);
                setBookData(response.data);
            } catch (error) {
                console.error("Error al cargar datos del audiolibro:", error);
            }
        };

        const checkFeedback = async () => {
            try {
                const response = await checkUserFeedback(userId, id);
                if (response.data.exists) {
                    setFeedbackExists(true); // Bloquear la ruta si ya hay feedback
                    navigate(`/inicio`);
                }
            } catch (error) {
                console.error("Error al verificar feedback existente:", error);
            }
        };

        fetchBookData();
        checkFeedback();
    }, [id, userId, navigate]);

    useEffect(() => {
        // Actualización de tema basado en el estado de darkMode
        document.body.className = darkMode
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-900";
    }, [darkMode]);

    if (feedbackExists || !bookData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const { title, author, coverUrl } = bookData;
    const labels = ["Horrible", "Malo", "Bueno", "Bien", "Excelente"];

    return (
        <div className={`min-h-screen  flex flex-col items-center ${darkMode ? "bg-gray-800 text-white" : " text-gray-900"}`}>
            <div className="shadow-md w-full max-w-5xl rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-teal-500 text-white py-8 px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold">Cuéntanos qué piensas de</h2>
                    <p className="mt-2 text-lg md:text-2xl italic">{title} de {author}</p>
                </div>

                {/* Main Content */}
                <div className="p-8 flex flex-col lg:flex-row items-center">
                    <img
                        src={coverUrl}
                        alt={title}
                        className="w-full h-auto rounded-lg mb-6 lg:mb-0 lg:mr-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl object-cover"
                    />

                    <div className="flex flex-col items-center w-full">
                        <h3 className="text-xl font-semibold mb-6 text-center text-teal-600">
                            ¿Cómo lo calificarías?
                        </h3>
                        {/* Stars */}
                        <div className="flex justify-center mb-6">
                            {labels.map((label, index) => (
                                <div key={index} className="flex flex-col items-center mx-2">
                                    <button
                                        onClick={() => handleRating(index + 1)}
                                        onMouseEnter={() => handleMouseEnter(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`text-6xl ${hoverRating >= index + 1 || rating >= index + 1
                                            ? "text-yellow-400"
                                            : "text-gray-300"
                                            } transition-colors duration-200`}
                                    >
                                        ★
                                    </button>
                                    {rating === index + 1 && (
                                        <span className="text-sm mt-2 text-gray-500">{label}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Comment Box */}
                        {rating && (
                            <textarea
                                value={comment}
                                onChange={handleCommentChange}
                                className="w-full max-w-lg p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700 resize-none"
                                placeholder="Máximo 280 caracteres..."
                                rows={5}
                                maxLength={280}
                            ></textarea>
                        )}

                        <p className="text-sm text-gray-500 mt-2">{comment.length} / 280 caracteres</p>
                        {errorMessage && (
                            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            className={`w-full max-w-lg py-3 mt-4 rounded-md text-white ${rating && !errorMessage
                                ? "bg-teal-600 hover:bg-teal-700"
                                : "bg-gray-300 cursor-not-allowed"
                                }`}
                            disabled={!rating || errorMessage}
                        >
                            Enviar comentario
                        </button>

                        <button
                            onClick={() => navigate(`/inicio`)}
                            className="mt-4 text-gray-400 underline text-sm"
                        >
                            Saltar
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <ModalReu
                    onClose={() => setShowModal(false)}
                    title="¡Reseña enviada exitosamente!"
                    message="Tu opinión ha sido registrada. ¡Gracias por tus comentarios!"
                />
            )}
        </div>
    );
};

export default Reseña;
