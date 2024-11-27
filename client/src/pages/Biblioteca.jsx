import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookmark, FiCheckCircle, FiMoreVertical, FiChevronRight } from "react-icons/fi";
import { addBookToLibraryCategory, deleteBookFromLibraryCategory, getUserLibraryCategory } from "../api/api";
import Card from "../components/cards/Card";
import ModalCards from "../components/modals/ModalCards"; // Opciones iniciales
import ConfirmCancelModal from "../components/modals/ConfirmCancelModal"; // Confirmación
import ModalReu from "../components/modals/ModalReu"; // Alerta
import { useAuth } from "../context/authContext";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { FaArrowLeft } from "react-icons/fa";

const Biblioteca = () => {
    const { user } = useAuth();
    const userId = user?.userId;

    const [savedCount, setSavedCount] = useState(0);
    const [finishedCount, setFinishedCount] = useState(0);
    const [savedAudiobooks, setSavedAudiobooks] = useState([]);
    const [finishedAudiobooks, setFinishedAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null); // { id, category, action }
    const [showModal, setShowModal] = useState(null); // Maneja todos los modales
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState("success");
    const [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate();

    const handleViewAll = (category) => {
        navigate(`/biblioteca/libros?filter=${category}`);
    };

    const handleCardClick = (id) => {
        navigate(`/preview/${id}`);
    };

    const toggleModal = (audiobookId, category) => {
        setActiveModal((prev) =>
            prev?.id === audiobookId && prev?.category === category
                ? null // Cierra el modal si ya está abierto
                : { id: audiobookId, category }
        );
    };

    const showAlertMessage = (title, message, type) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalType(type); // Define el tipo: "success" o "error"
        setShowModal({ type: "alert", title, message, modalType: type }); // Muestra solo el modal de alerta
        setTimeout(() => setShowModal(null), 2000); // Cierra el modal después de 2 segundos
    };

    const handleAddToRecommended = async () => {
        try {
            const audiobook = savedAudiobooks.find((book) => book.id === activeModal?.id);
            if (!audiobook) return;

            const response = await addBookToLibraryCategory({
                userId,
                audiobookId: audiobook.id,
                category: "recommended",
            });

            if (response.status === 200) {
                showAlertMessage("Éxito", "Audiolibro agregado a recomendados.", "success");
            } else {
                showAlertMessage("Error", "Error al agregar a recomendados.", "error");
            }
        } catch (error) {
            console.error("Error al agregar a recomendados:", error);
            showAlertMessage("Error", "Error al agregar a recomendados.", "error");
        } finally {
            setActiveModal(null);
        }
    };

    const handleRemoveFromSaved = async () => {
        try {
            const audiobook = savedAudiobooks.find((book) => book.id === activeModal?.id);
            if (!audiobook) return;

            const response = await deleteBookFromLibraryCategory(userId, audiobook.id, "saved");

            if (response.status === 200 || response.status === 204) {
                showAlertMessage("Éxito", "Audiolibro eliminado de Guardados.", "success");
                setSavedAudiobooks((prev) => prev.filter((book) => book.id !== audiobook.id));
            } else {
                showAlertMessage("Error", "Error al eliminar el audiolibro.", "error");
            }
        } catch (error) {
            console.error("Error al eliminar el audiolibro:", error);
            showAlertMessage("Error", "Error al eliminar el audiolibro.", "error");
        } finally {
            setActiveModal(null);
        }
    };

    useEffect(() => {
        const fetchLibraryData = async () => {
            setLoading(true);
            try {
                const savedResponse = await getUserLibraryCategory(userId, "saved");
                const savedData = savedResponse?.data?.saved || {};
                setSavedAudiobooks(savedData.audiobooks || []);
                setSavedCount(savedData.count || 0);

                const finishedResponse = await getUserLibraryCategory(userId, "finished");
                const finishedData = finishedResponse?.data?.finished || {};
                setFinishedAudiobooks(finishedData.audiobooks || []);
                setFinishedCount(finishedData.count || 0);
            } catch (error) {
                console.error("Error al cargar los audiolibros:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, [userId]);

    const renderAudiobookSection = (title, icon, audiobooks, category, showOptions) => (
        <div className="max-w-7xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {icon}
                    <div>
                        <h2 className="text-3xl font-bold">{title}</h2>
                        <div className="text-sm text-gray-500">{audiobooks.length} items</div>
                    </div>
                </div>
                <button
                    onClick={() => handleViewAll(category)}
                    className="text-blue-500 hover:text-blue-900 text-sm flex items-center gap-1"
                >
                    Ver todos <FiChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading
                    ? [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
                    : audiobooks.slice(0, 4).map((audiobook) => (
                        <div key={`${category}-${audiobook.id}`} className="relative">
                            <Card
                                id={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl}
                                duration={audiobook.duration}
                                averagerating={audiobook.averageRating}
                                onClick={() => handleCardClick(audiobook.id)}
                            />
                            {showOptions && (
                                <button
                                    onClick={() => toggleModal(audiobook.id, category)}
                                    className="absolute top-2 right-2 text-xl text-gray-800 hover:text-gray-400 focus:outline-none"
                                >
                                    <FiMoreVertical />
                                </button>
                            )}
                            {activeModal?.id === audiobook.id && activeModal?.category === category && (
                                <ModalCards
                                    onAddToRecommended={() => setShowModal({ type: "confirm", action: "recommend" })}
                                    onRemoveFromSaved={() => setShowModal({ type: "confirm", action: "remove" })}
                                    onDetails={() => handleCardClick(audiobook.id)}
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 min-h-screen">
            <button
                onClick={() => navigate(`/inicio`)}
                className="flex items-center hover:text-gray-500 mb-4"
            >
                <FaArrowLeft className="mr-2" />
                Volver
            </button>

            {/* Mostrar el modal de confirmación solo cuando es necesario */}
            {showModal?.type === "confirm" && (
                <ConfirmCancelModal
                    isOpen={showModal.type === "confirm"}
                    onClose={() => setShowModal(null)}
                    onConfirm={showModal.action === "recommend" ? handleAddToRecommended : handleRemoveFromSaved}
                    title={showModal.action === "recommend" ? "Confirmar Recomendación" : "Confirmar Eliminación"}
                    message={showModal.action === "recommend" ? "¿Estás seguro de agregar este audiolibro a Recomendados?" : "¿Estás seguro de eliminar este audiolibro de Guardados?"}
                />
            )}

            {/* Mostrar el modal de alerta */}
            {showModal?.type === "alert" && (
                <ModalReu
                    title={modalTitle}
                    message={modalMessage}
                    type={modalType}
                    onClose={() => setShowModal(null)}
                />
            )}

            {/* Renderiza las secciones de audiolibros */}
            {renderAudiobookSection("Guardados", <FiBookmark />, savedAudiobooks, "saved", true)}
            {renderAudiobookSection("Terminados", <FiCheckCircle />, finishedAudiobooks, "finished", false)}
        </div>
    );
};

export default Biblioteca;
