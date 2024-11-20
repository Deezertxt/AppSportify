import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAudiobookById, createFeedback } from '../api/api';
import { useAuth } from '../context/authContext';
import ModalReu from './ModalReu';

const Reseña = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(null);
    const [hoverRating, setHoverRating] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [comment, setComment] = useState('');
    const [showModal, setShowModal] = useState(false); // Estado para mostrar modal
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user.userId;

    const handleRating = (rate) => setRating(rate);
    const handleMouseEnter = (rate) => setHoverRating(rate);
    const handleMouseLeave = () => setHoverRating(null);
    const handleCommentChange = (e) => setComment(e.target.value);

    const handleSubmit = async () => {
        if (!rating) return; // Asegurarse de que haya un rating antes de enviar

        const feedbackData = {
            userId: userId,
            audiobookId: parseInt(id, 10),
            comment: comment,
            rating: rating,
        };

        try {
            const response = await createFeedback(feedbackData);
            if (response.status === 200) {
                setShowModal(true); // Mostrar el modal después del envío exitoso
                setTimeout(() => {
                    setShowModal(false); // Ocultar modal
                    navigate(`/libros`); // Redirigir al inicio
                }, 3000); // Mostrar modal durante 3 segundos
            } else {
                console.error('Error al enviar la reseña');
            }
        } catch (error) {
            console.error('Error al enviar la reseña:', error);
        }
    };

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await getAudiobookById(id);
                if (response.data && response.data.id === parseInt(id, 10)) {
                    setBookData(response.data);
                } else {
                    console.error(`No se encontró un libro con el id: ${id}`);
                }
            } catch (error) {
                console.error('Error al cargar datos del audiolibro:', error);
            }
        };

        fetchBookData();
    }, [id]);

    if (!bookData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="border-t-4 border-teal-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>
        );
    }

    const { title, author, coverUrl } = bookData;
    const labels = ["Horrible", "Malo", "Bueno", "Bien", "Excelente"];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <div className="bg-[#ABDADC] w-full py-10 px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left md:w-2/3">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
                        Cuéntanos qué piensas de
                    </h2>
                    <p className="italic text-lg md:text-xl text-blue-700 mt-2">
                        {title} de {author}  
                    </p>
                </div>
                <div className="mt-4 md:mt-0 md:w-1/3 flex justify-center">
                    <img
                        src={coverUrl}
                        alt="Conversación"
                        className="w-24 h-24 md:w-32 md:h-32"
                    />
                </div>
            </div>

            <div className="w-full max-w-xl bg-white px-6 py-8 mt-1 rounded-md">
                <h3 className="text-xl font-semibold mb-6 text-center text-blue-900">
                    ¿Cómo lo calificarías?
                </h3>

                <div className="flex justify-center mb-4 space-x-6">
                    {labels.map((label, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <button
                                onClick={() => handleRating(index + 1)}
                                onMouseEnter={() => handleMouseEnter(index + 1)}
                                onMouseLeave={handleMouseLeave}
                                className={`text-6xl ${hoverRating >= index + 1
                                    ? 'text-yellow-500'
                                    : rating >= index + 1
                                        ? 'text-yellow-300'
                                        : 'text-gray-300'
                                    } transition-colors duration-200`}
                            >
                                ★
                            </button>
                            {rating === index + 1 && (
                                <span className="text-sm mt-2 text-gray-700">{label}</span>
                            )}
                        </div>
                    ))}
                </div>

                {rating && (
                    <>
                        <h3 className="text-lg font-semibold mb-2 text-center">
                            ¿Algo más que quieras compartir?
                        </h3>
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Comparte tus pensamientos..."
                            rows="3"
                        ></textarea>
                    </>
                )}

                <button
                    onClick={handleSubmit}
                    className={`w-full py-2 px-8 text-lg rounded-md mt-2 ${rating ? 'bg-[#16697A] text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                    disabled={!rating}
                >
                    Enviar comentario
                </button>

                <button
                    onClick={() => navigate(`/libros`)}
                    className="mt-4 text-gray-500 underline text-sm"
                >
                    Saltar
                </button>
            </div>

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
