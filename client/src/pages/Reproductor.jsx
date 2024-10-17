import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import AudiobookCover from "../components/AudiobookCover";
import ChapterText from "../components/ChapterText";
import ProgressBar from "../components/ProgressBar";
import AudioDetails from "../components/AudioDetails";
import ControlButtons from "../components/ControlButtons";
import PlayerControls from "../components/PlayerControls";
import { getAudiobookById } from "../api/api"; // Importa la función para obtener el audiolibro


const Reproductor = () => {
    const { id } = useParams();
    const [audiobook, setAudiobook] = useState(null);
    const [fontSize, setFontSize] = useState('16px');
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    // Agrega un valor de prueba para `audioSrc` (enlace público)
    const audioSrc = "https://www.safewalking.es/wp-content/uploads/Prueba-de-nivel-nuevos-alumnos-listening-1.mp3"; // Audio de prueba

    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id); // Llama a la API con el ID
                setAudiobook(response.data); // Establece el audiolibro en el estado
            } catch (error) {
                console.error("Error fetching audiobook:", error);
                setAudiobook(null); // Maneja errores
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
    };

    // Manejar actualización de progreso
    const handleProgress = () => {
        if (audioRef.current) {
            const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(currentProgress);
            setTotalDuration(audioRef.current.duration);
        }
    };

    // Manejar cambio de volumen
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    // Manejar cambio de velocidad de reproducción
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    // Manejar cambio de progreso al arrastrar el botón de progreso
    const handleProgressChange = (newProgress) => {
        if (audioRef.current) {
            const newTime = (newProgress / 100) * totalDuration;
            audioRef.current.currentTime = newTime;
            setProgress(newProgress);
        }
    };

    // Arreglar retroceso y adelanto de 10 segundos
    const handleBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
        }
    };

    const handleForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
        }
    };
    if (!audiobook) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
    }
    return (
        <div className="flex flex-col h-screen bg-econd">
            <div className="flex-grow flex items-center justify-center">
                <ChapterText text={audiobook.text} fontSize={fontSize} />
            </div>

            <div className="bg-first text-white p-4 flex flex-col items-center">
                <ProgressBar
                    progress={progress}
                    totalDuration={totalDuration}
                    onProgressChange={handleProgressChange}
                />

                <div className="flex justify-between items-center w-full mt-4"> {/* Asegúrate de que ocupe todo el ancho */}
                    {/* Detalles del Audiolibro */}
                    <div className="flex items-start mb-2">
                        <AudiobookCover coverUrl={audiobook.coverUrl} className="w-25 h-20 object-cover" />
                        <div className="ml-4"> {/* Agregando margen izquierdo aquí */}
                            <AudioDetails title={audiobook.title} author={audiobook.author} />
                        </div>
                    </div>

                    {/* Controles de Reproducción con ControlButtons */}
                    <ControlButtons
                        isPlaying={isPlaying}
                        togglePlay={togglePlayPause}
                        handleBackward={handleBackward}
                        handleForward={handleForward}
                    />

                    {/* Control de Velocidad y Volumen */}
                    <div className="flex items-center">
                        <PlayerControls speed={speed} setSpeed={setSpeed} volume={volume} setVolume={setVolume} />

                    </div>
                    {/* Elemento de audio oculto */}
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        onTimeUpdate={handleProgress}
                        onLoadedMetadata={() => setTotalDuration(audioRef.current.duration)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reproductor;
