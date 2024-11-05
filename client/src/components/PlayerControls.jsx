import React, { useState} from 'react';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

const PlaybackSpeed = ({ speed, setSpeed }) => {
    const [showSpeed, setShowSpeed] = useState(false);

    const speeds = [2.0, 1.5, 1.0, 0.5];

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowSpeed(true)}
            onMouseLeave={() => setShowSpeed(false)}
        >
            <button className="text-xl text-white rounded-full px-4 py-2 hover:text-green-500">
                {speed}x
            </button>

            {showSpeed && (
                <div className="absolute bottom-8 flex flex-col items-start bg-gray-700 px-2 py-2 rounded-lg -translate-x-1/2 left-1/2 shadow-lg">
                    {speeds.map((sp) => (
                        <button
                            key={sp}
                            onClick={() => setSpeed(sp)}
                            className={`text-white hover:text-green-500 text-h6 font-bold px-4 py-2 ${
                                speed === sp ? "!text-green-500" : ""
                            }`}
                        >
                            {sp}×
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const VolumeControl = ({ volume, setVolume }) => {
    const [isMuted, setIsMuted] = useState(false);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0); // Actualiza el estado de mute
    };

    const toggleMute = () => {
        if (isMuted) {
            setVolume(100); // Restaura el volumen al máximo si estaba en silencio
        } else {
            setVolume(0); // Silencia el audio
        }
        setIsMuted(!isMuted); // Cambia el estado de silencio
    };

    return (
        <div className="flex items-center ml-4">
            {/* Ícono de volumen con mute */}
            {isMuted ? (
                <FiVolumeX
                    className="text-2xl cursor-pointer text-white hover:text-green-500"
                    onClick={toggleMute}
                />
            ) : (
                <FiVolume2
                    className="text-2xl cursor-pointer text-white hover:text-green-500"
                    onClick={toggleMute}
                />
            )}
            
            {/* Control deslizante de volumen */}
            <div className="relative w-32 mx-2">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 cursor-pointer bg-gray-600 rounded-lg appearance-none"
                    style={{
                        WebkitAppearance: 'none',
                        appearance: 'none',
                        background: `linear-gradient(to right, #48bb78 ${volume}%, #4b5563 ${volume}%)`
                    }}
                />
                {/* Estilos del thumb */}
                <style jsx>{`
                    input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 20px;
                        height: 20px;
                        background: white; /* Color del thumb cambiado a blanco */
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid #333; /* Borde del thumb */
                    }

                    input[type='range']::-moz-range-thumb {
                        width: 20px;
                        height: 20px;
                        background: white; /* Color del thumb cambiado a blanco */
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid #333; /* Borde del thumb */
                    }

                    input[type='range']::-webkit-slider-runnable-track {
                        background: transparent; /* Transparente para mostrar la barra de volumen */
                        border-radius: 5px;
                    }

                    input[type='range']::-moz-range-track {
                        background: transparent; /* Transparente para mostrar la barra de volumen */
                        border-radius: 5px;
                    }
                `}</style>
            </div>
        </div>
    );
};

const PlayerControls = ({ speed, setSpeed, volume, setVolume }) => {
    return (
        <div className="flex items-center">
            <PlaybackSpeed speed={speed} setSpeed={setSpeed} />
            <VolumeControl volume={volume} setVolume={setVolume} />
        </div>
    );
};

export default PlayerControls;


