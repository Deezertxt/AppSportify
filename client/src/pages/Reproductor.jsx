import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../components/reproductor/ProgressBar";
import ControlButtons from "../components/reproductor/ControlButtons";
import PlayerControls from "../components/reproductor/PlayerControls";
import { FiArrowLeft } from "react-icons/fi";
import { getAudiobookById } from '../api/api';

const Reproductor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [volume, setVolume] = useState(100);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await getAudiobookById(id);
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching audiobook:", error);
            }
        };
        fetchBookData();
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

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setHasEnded(true); // Marcar que el audio ha terminado
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

    if (!bookData) {
        return <div className="flex items-center justify-center h-screen text-xl text-white">Cargando...</div>;
    }

    const { title, author, coverUrl, audioUrl } = bookData;

    return (
        <div className="min-h-0 text-white relative flex flex-col items-center p-4">
            {/* Botón de cierre en la esquina superior izquierda */}
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 mb-6 flex items-center">
                <FiArrowLeft className="mr-2" />
                Volver
            </button>

            <main className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mt-8 flex flex-col items-center">
                {/* Imagen de portada que ocupa casi toda la altura */}
                <div className="w-full md:w-1/3 mb-4">
                    <img
                        src={coverUrl}
                        alt="Book Cover"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                    />
                </div>

                {/* Título y Autor con más espacio y centrado */}
                <div className="text-center mt-4 mb-2">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-400 text-sm mt-1">{author}</p>
                </div>

                {/* Barra de Progreso con más espacio */}
                <div className="w-full mb-4">
                    <ProgressBar
                        progress={progress}
                        totalDuration={totalDuration}
                        onProgressChange={handleProgressChange}
                    />
                </div>

                {/* Controles de Reproducción con más separación */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                    <ControlButtons
                        isPlaying={isPlaying}
                        togglePlay={togglePlayPause}
                        handleBackward={handleBackward}
                        handleForward={handleForward}
                        handleRestart={handleRestart} // Pasar la función handleRestart
                        hasEnded={hasEnded} // Pasar estado de fin de audio
                        className="flex justify-center space-x-2 md:space-x-4"
                    />
                </div>

                {/* Controles de Velocidad y Volumen */}
                <div className="justify-self-center">
                    <PlayerControls speed={speed} setSpeed={setSpeed} volume={volume} setVolume={setVolume} />
                </div>

                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleAudioEnded}
                />
            </main>
        </div>
    );
};

export default Reproductor;
