import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiBookmark, FiCheckCircle, FiMoreVertical, FiChevronRight, } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { addBookToLibraryCategory, deleteBookFromLibraryCategory, getUserLibraryCategory } from "../api/api";
import Card from "../components/cards/Card";
import ModalCard from "../components/modals/ModalCards"; // Nuevo modal compacto
import { useAuth } from "../context/authContext";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import ModalReu from "../components/modals/ModalReu"; // Importar el nuevo modal
import ModalConfirmacionBorrado from "../components/modals/ModalConfirmacionBorrado";

const Biblioteca = () => {
    const { user } = useAuth();
    const userId = user.userId;

    const [savedCount, setSavedCount] = useState(0);
    const [finishedCount, setFinishedCount] = useState(0);
    const [savedAudiobooks, setSavedAudiobooks] = useState([]);
    const [finishedAudiobooks, setFinishedAudiobooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState(null); // { id, category }

    // Estados para el ModalReu
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [modalType, setModalType] = useState("success"); // "success" o "error"


    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAudiobookId, setSelectedAudiobookId] = useState(null); //id del audiolibro a eliminar

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    const handleViewAll = (category) => {
        navigate(`/biblioteca/libros?filter=${category}`);
    };

    const handleCardClick = (id) => {
        navigate(`/preview/${id}`); // Redirige al reproductor del audiolibro usando el id
    };

    const handleConfirmDelete = () => {
        handleRemoveFromSaved(selectedAudiobookId);
        setShowConfirmModal(false);
    };

    const openConfirmModal = (audiobookId) => {
        setSelectedAudiobookId(audiobookId);
        setShowConfirmModal(true);
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
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // Cerrar el modal después de 2 segundos
    };

    const handleAddToRecommended = async () => {
        try {
            const audiobook = savedAudiobooks.find((book) => book.id === activeModal?.id);
            if (!audiobook) return;

            const response = await addBookToLibraryCategory({
                userId: user.userId,
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

            if (response.status === 200) {
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
                                    className="absolute top-2 right-2 text-xl text-white hover:text-gray-500 focus:outline-none"
                                >
                                    <FiMoreVertical />
                                </button>
                            )}
                            {activeModal?.id === audiobook.id && activeModal?.category === category && (
                                <ModalCard
                                    onDetails={() => handleCardClick(audiobook.id)}
                                    onAddToRecommended={handleAddToRecommended}
                                    onRemoveFromSaved={handleRemoveFromSaved}
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6 min-h-screen ">
            {/* Botón de volver */}
            <button
                onClick={handleBack}
                className="flex items-center  hover:text-gray-500 mb-4"
                title="Regresar"
            >
                {/* Ícono FaArrowLeft */}
                <FaArrowLeft className="mr-2" />
                Volver
            </button>

            {/* Modal de alerta */}
            {showModal && (
                <ModalReu
                    onClose={() => setShowModal(false)}
                    title={modalTitle}
                    message={modalMessage}
                    type={modalType}
                />
            )}

            {/*modal de confirmacion de borrado*/}
            {showConfirmModal && (
                <ModalConfirmacionBorrado
                    title="Confirmar eliminación"
                    message="¿Estás seguro de que deseas eliminar este audiolibro?"
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setShowConfirmModal(false)}
                />
            )}

            {renderAudiobookSection("Guardados", <FiBookmark />, savedAudiobooks, "saved", true)}
            {renderAudiobookSection("Terminados", <FiCheckCircle />, finishedAudiobooks, "finished", false)}
        </div>
    );
};

export default Biblioteca;
