import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AudiobookCover from "../components/reproductor/AudiobookCover";
import ProgressBar from "../components/reproductor/ProgressBar";
import AudioDetails from "../components/reproductor/AudioDetails";
import ControlButtons from "../components/reproductor/ControlButtons";
import PlayerControls from "../components/reproductor/PlayerControls";
import { getAudiobookById, addBookToLibraryCategory } from "../api/api";
import { FiArrowLeft, FiCheck } from "react-icons/fi";


import { useAuth } from "../context/authContext";
import { useLibrary } from '../context/libraryContext';


const AudioLibroReproductor = () => {

    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [audiobook, setAudiobook] = useState(null);
    const [fontSize, setFontSize] = useState(16);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false); // Nuevo estado
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const {
        isBookSaved,
        isBookFinished,
        addToSaved,
        addToFinished,
    } = useLibrary();


    const handleFinishedToLibrary = async () => {
        if (isBookFinished(parseInt(id, 10))) return;

        try {
            navigate(`/resenia/${id}`);

            const response = await addBookToLibraryCategory({
                firebaseUserId: user.userId,
                audiobookId: parseInt(id, 10),
                category: "finished",
            });
            if (response.status === 200) {
                addToFinished(parseInt(id, 10)); // Actualiza el estado global
                alert("Audiolibro marcado como terminado.");
            } else {
                alert("Error al marcar el audiolibro.");
            }
        } catch (error) {
            console.error("Error al marcar el audiolibro:", error);
            alert("Error al marcar el audiolibro.");
        }
    };

    const handleSaveToLibrary = async () => {
        if (isBookSaved(parseInt(id, 10))) return;

        try {
            const response = await addBookToLibraryCategory({
                firebaseUserId: user.userId,
                audiobookId: parseInt(id, 10),
                category: "saved",
            });
            if (response.status === 200) {
                addToSaved(parseInt(id, 10)); // Actualiza el estado global
                alert("Audiolibro guardado en la biblioteca.");
            } else {
                alert("Error al guardar el audiolibro.");
            }
        } catch (error) {
            console.error("Error al guardar el audiolibro:", error);
            alert("Error al guardar el audiolibro.");
        }
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

    const increaseFontSize = () => setFontSize(prev => prev + 2);
    const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 10));

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setHasEnded(false); // Reiniciar estado al pausar/reproducir
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
        setHasEnded(true); // Marcar que el audio ha terminado
    };

    const handleProgressChange = (newProgress) => {
        if (audioRef.current && totalDuration > 0) {
            const newTime = (newProgress / 100) * totalDuration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
            setHasEnded(false); // Reiniciar el estado si se mueve manualmente la barra
        }
    };

    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            setHasEnded(false); // Reiniciar estado si se retrocede
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
            setHasEnded(false); // Reiniciar estado si se adelanta
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
                <button onClick={() => navigate(-1)} className="text-black flex items-center mb-4">
                    <FiArrowLeft className="mr-2" />
                    Volver
                </button>
            </div>

            {/* Contenido del audiolibro */}
            <div className="overflow-y-auto p-4 flex-grow place-items-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
                {paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4 text-lg leading-normal text-gray-800">
                        {paragraph}
                    </p>
                ))}
                <div className="mt-20 mb-16">
                    <button
                        onClick={handleFinishedToLibrary}
                        className={`flex items-center mt-6 ${isBookFinished(parseInt(id, 10))
                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                            : "bg-first text-white hover:bg-first-dark"
                            } font-semibold py-2 px-4 transition-colors duration-300`}
                        disabled={isBookFinished(parseInt(id, 10))} // Deshabilitar si ya está guardado
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
        </div>
    );

};

export default AudioLibroReproductor;
