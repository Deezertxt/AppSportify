import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AudiobookCover from "../components/AudiobookCover";
import ProgressBar from "../components/ProgressBar";
import AudioDetails from "../components/AudioDetails";
import ControlButtons from "../components/ControlButtons";
import PlayerControls from "../components/PlayerControls";
import { getAudiobookById } from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
const AudioLibroReproductor = () => {
    const { id } = useParams();
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
        <div className="flex flex-col h-screen bg-white">
            <div className="fixed top-0 left-0 h-full w-12 bg-gray-100 flex flex-col items-center pt-4 space-y-4">
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" onClick={() => navigate(-2)}>🏠</button>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">⚙️</button>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" onClick={increaseFontSize}>A+</button>
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300" onClick={decreaseFontSize}>A-</button>
            </div>

            <div className="flex-wrap-reverse justify-items-center overflow-y-auto p-4 ml-12 h-[calc(100vh-120px)]">
                <div className="text-gray-900 p-4 overflow-y-auto h-full" style={{ fontSize: `${fontSize}px` }}>
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
                    {paragraphs.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-lg leading-relaxed text-gray-800">
                            {paragraph}
                        </p>
                    ))}
                    <div className="mt-20 mb-16">
                       <button className="bg-[#16697A] text-white px-14 py-3 rounded hover:bg-teal-800	 w-full sm:w-auto">
                             <p className="text-center" style={{ fontFamily: 'Times New Roman', serif: 'serif' }}>
                                   <FontAwesomeIcon icon={faCheck} className="text-white" /> Marcar como terminado
                            </p>
                      </button>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full bg-first text-white p-4 flex flex-col space-y-4 md:space-y-6">
                <ProgressBar
                    progress={progress}
                    totalDuration={totalDuration}
                    onProgressChange={handleProgressChange}
                    className="w-full"
                />

                <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
                    <div className="flex items-start">
                        <AudiobookCover coverUrl={audiobook.coverUrl} className="w-20 h-20 md:w-25 md:h-25 object-cover rounded-md" />
                        <div className="ml-4">
                            <AudioDetails title={audiobook.title} author={audiobook.author} className="text-sm md:text-base" />
                        </div>
                    </div>

                    <ControlButtons
                        isPlaying={isPlaying}
                        togglePlay={togglePlayPause}
                        handleBackward={handleBackward}
                        handleForward={handleForward}
                        handleRestart={handleRestart} // Pasar la función handleRestart
                        hasEnded={hasEnded} // Pasar estado de fin de audio
                        className="flex justify-center space-x-2 md:space-x-4"
                    />

                    <PlayerControls
                        speed={speed}
                        setSpeed={setSpeed}
                        volume={volume}
                        setVolume={setVolume}
                        className="flex items-center space-x-2 md:space-x-4"
                    />
                </div>

                <audio
                    ref={audioRef}
                    src={audiobook.audioUrl}
                    onTimeUpdate={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleAudioEnded} // Marcar como terminado
                />
            </div>
        </div>
    );
};

export default AudioLibroReproductor;