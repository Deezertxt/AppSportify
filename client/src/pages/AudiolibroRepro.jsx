import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AudiobookCover from "../components/reproductor/AudiobookCover";
import ProgressBar from "../components/reproductor/ProgressBar";
import AudioDetails from "../components/reproductor/AudioDetails";
import ControlButtons from "../components/reproductor/ControlButtons";
import PlayerControls from "../components/reproductor/PlayerControls";
import { getAudiobookById, addBookToLibraryCategory, deleteBookFromLibraryCategory } from "../api/api";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

import { useAuth } from "../context/authContext";
import { useLibrary } from '../context/libraryContext';
import ModalReu from "../components/modals/ModalReu"; // Suponiendo que tienes el modal ya creado.

const AudioLibroReproductor = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [audiobook, setAudiobook] = useState(null);
    const [fontSize, setFontSize] = useState(16);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [showModal, setShowModal] = useState(false); // Para mostrar el modal
    const [modalMessage, setModalMessage] = useState(""); // Mensaje para el modal
    const [modalAction, setModalAction] = useState(null); // Acción a ejecutar si se confirma

    const {
        isBookSaved,
        isBookFinished,
        addToSaved,
        addToFinished,
        removeFromSaved
    } = useLibrary();

    const handleFinishedToLibrary = async () => {
        if (isBookFinished(parseInt(id, 10))) return;

        // Mostrar el modal con el mensaje de "procesando"
        setModalMessage("Marcando el audiolibro como terminado...");
        setModalAction(null); // No es necesario tener una acción de confirmación
        setShowModal(true);

        try {
            // Realiza la acción para marcar el audiolibro como terminado
            const response = await addBookToLibraryCategory({
                userId: user.userId,
                audiobookId: parseInt(id, 10),
                category: "finished",
            });

            if (response.status === 200) {
                addToFinished(parseInt(id, 10));
                setModalMessage("Audiolibro marcado como terminado.");
            } else {
                setModalMessage("Error al marcar el audiolibro.");
            }

            // Usamos un setTimeout para esperar antes de realizar la navegación
            setTimeout(() => {
                navigate(`/resenia/${id}`); // Navegar después de mostrar el mensaje
            }, 2000); // El tiempo debe coincidir con el que se muestra el modal

        } catch (error) {
            console.error("Error al marcar el audiolibro:", error);
            setModalMessage("Error al marcar el audiolibro.");
            // Usamos setTimeout también aquí para navegar después del mensaje
            setTimeout(() => {
                navigate(`/resenia/${id}`); // Navegar después de mostrar el mensaje
            }, 2000);
        }

        // Opcionalmente cerrar el modal después de un tiempo
        setTimeout(() => setShowModal(false), 2000); // Cierra el modal después de 2 segundos
    };

    const handleSaveToLibrary = async () => {
        if (isBookSaved(parseInt(id, 10))) {
          // Si el libro ya está guardado, lo eliminamos
          setModalMessage("Eliminando el audiolibro de la biblioteca...");
          setModalAction(null); // No es necesario tener una acción de confirmación
          setShowModal(true);
      
          try {
            // Usamos la API de eliminación
            const response = await deleteBookFromLibraryCategory(
              user.userId,
              parseInt(id, 10),
              "saved" // Aquí usamos "saved" para indicar que el libro está guardado
            );
            
            if (response.status === 200) {
              removeFromSaved(parseInt(id, 10)); // Actualiza el estado del libro en la biblioteca
              setModalMessage("Audiolibro eliminado de la biblioteca.");
            } else {
              setModalMessage("Error al eliminar el audiolibro.");
            }
          } catch (error) {
            console.error("Error al eliminar el audiolibro:", error);
            setModalMessage("Error al eliminar el audiolibro.");
          }
        } else {
          // Si el libro no está guardado, lo agregamos
          setModalMessage("Guardando el audiolibro en la biblioteca...");
          setModalAction(null); // No es necesario tener una acción de confirmación
          setShowModal(true);
      
          try {
            const response = await addBookToLibraryCategory({
              userId: user.userId,
              audiobookId: parseInt(id, 10),
              category: "saved", // Aquí usamos "saved" para agregar el libro a los guardados
            });
            
            if (response.status === 200) {
              addToSaved(parseInt(id, 10)); // Actualiza el estado del libro en la biblioteca
              setModalMessage("Audiolibro guardado en la biblioteca.");
            } else {
              setModalMessage("Error al guardar el audiolibro.");
            }
          } catch (error) {
            console.error("Error al guardar el audiolibro:", error);
            setModalMessage("Error al guardar el audiolibro.");
          }
        }
      
        // Opcionalmente cerrar el modal después de un tiempo o al actualizar
        setTimeout(() => setShowModal(false), 2000);  // Se cierra el modal después de 2 segundos
      };
      

    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id);
                setAudiobook(response.data);
            } catch (error) {
                console.error("Error fetching audiobook:", error);
                setAudiobook(null);
            }
        };
        fetchAudiobook();
    }, [id]);


    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setHasEnded(false);
    };

    const handleRestart = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
            setHasEnded(false);
        }
    };

    const handleProgress = () => {
        if (audioRef.current) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setTotalDuration(audioRef.current.duration);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setHasEnded(true);
    };

    const handleProgressChange = (newProgress) => {
        if (audioRef.current && totalDuration > 0) {
            const newTime = (newProgress / 100) * totalDuration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
            setHasEnded(false);
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            setHasEnded(false);
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
            setHasEnded(false);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    if (!audiobook) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }

    const [title, ...paragraphs] = audiobook.text.split("\n").filter(line => line.trim() !== "");

    return (
        <div className="flex flex-col flex-grow ">
            {/* Botón de regreso */}
            <div className="p-4">
                <button onClick={() => navigate(-1)} className="flex items-center mb-4">
                    <FiArrowLeft className="mr-2" />
                    Volver
                </button>

                {/* Contenido del audiolibro */}
                <div className="overflow-y-auto p-4 flex-grow place-items-center">
                    <h1 className="text-2xl font-bold mb-4">{title}</h1>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-lg leading-normal">
                            {paragraph}
                        </p>
                    ))}
                    <div className="mt-20 mb-16">
                        <button
                            onClick={handleFinishedToLibrary}
                            className={`flex items-center mt-6 ${isBookFinished(parseInt(id, 10))
                                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                : "bg-first text-white hover:bg-first-dark"
                                } font-semibold py-2 px-4 transition-colors duration-300}
                        disabled={isBookFinished(parseInt(id, 10))`} // Deshabilitar si ya está guardado
                        >
                            <FiCheck className="mr-2" />
                            {isBookFinished(parseInt(id, 10)) ? "Terminado" : "Marcar como terminado"}
                        </button>
                    </div>
                </div>

                {/* Controles de audio y detalles */}
                <div className="w-full bg-first text-white p-4 space-y-4">
                    <ProgressBar
                        progress={progress}
                        totalDuration={totalDuration}
                        onProgressChange={handleProgressChange}
                        className="w-full"
                    />

                    <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
                        <div className="flex items-start">
                            <AudiobookCover coverUrl={audiobook.coverUrl} className="w-20 h-20 object-cover rounded-md" />
                            <div className="ml-4">
                                <AudioDetails title={audiobook.title}
                                    author={audiobook.author}
                                    isSaved={isBookSaved(parseInt(id, 10))}
                                    onSave={handleSaveToLibrary}
                                />
                            </div>
                        </div>

                        <ControlButtons
                            isPlaying={isPlaying}
                            togglePlay={togglePlayPause}
                            handleBackward={handleBackward}
                            handleForward={handleForward}
                            handleRestart={handleRestart}
                            hasEnded={hasEnded}
                            className="flex justify-center space-x-2 md:space-x-4"
                        />

                        <PlayerControls
                            speed={speed}
                            setSpeed={setSpeed}
                            volume={volume}
                            setVolume={setVolume}
                        />
                    </div>

                    <audio
                        ref={audioRef}
                        src={audiobook.audioUrl}
                        onTimeUpdate={handleProgress}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleAudioEnded}
                    />
                </div>
            </div >

            {showModal && (
                <ModalReu
                    message={modalMessage}
                    onConfirm={modalAction}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default AudioLibroReproductor;

