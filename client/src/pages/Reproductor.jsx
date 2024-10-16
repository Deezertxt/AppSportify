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
    const [isplaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [showSpeed, setShowSpeed] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [showVolume, setShowVolume] = useState(false);
    const [synth] = useState(window.speechSynthesis);
    const [utterance, setUtterance] = useState(null);

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

    // Verifica si el audiolibro está cargado
    if (!audiobook) {
        return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>; // Indicador de carga
    }

    const togglePlay = () => {
        if (isPlaying) {
            synth.cancel();
            setIsPlaying(false);
        } else {
            synth.speak(utterance);
            setIsPlaying(true);
        }
    };
    const rewind = () => {
        setProgress(prev => Math.max(prev - 10, 0)); // Resta 10 segundos
    };

    const fastForward = () => {
        setProgress(prev => Math.min(prev + 10, totalDuration)); // Suma 10 segundos
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-grow flex items-center justify-center">
                <ChapterText text={audiobook.text} fontSize={fontSize} />
            </div>

            <div className="bg-first text-white p-4 flex flex-col items-center">
                <ProgressBar progress={progress} totalDuration={totalDuration} onProgressChange={setProgress} />

                <div className="flex justify-between items-center w-full mt-4"> {/* Asegúrate de que ocupe todo el ancho */}
                    {/* Detalles del Audiolibro */}
                    <div className="flex items-start mb-2">
                        <AudiobookCover coverUrl={audiobook.coverUrl} className="w-20 h-20 object-cover" />
                        <div className="ml-4"> {/* Agregando margen izquierdo aquí */}
                            <AudioDetails title={audiobook.title} author={audiobook.author} />
                        </div>
                    </div>

                    {/* Controles de Reproducción */}
                    <div className="flex items-center justify-center mx-4"> {/* mx-4 para margen horizontal */}
                        <ControlButtons
                            playing={isplaying}
                            togglePlay={togglePlay}
                            rewind={rewind}
                            fastForward={fastForward}
                        />
                    </div>

                    {/* Control de Velocidad y Volumen */}
                    <div className="flex items-center">
                    <PlayerControls speed={speed} setSpeed={setSpeed} volume={volume} setVolume={setVolume} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reproductor;
