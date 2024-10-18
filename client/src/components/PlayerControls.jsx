import React, { useState} from 'react';
import { FiVolume2} from 'react-icons/fi';

const PlaybackSpeed = ({ speed, setSpeed }) => {
    const [showSpeed, setShowSpeed] = useState(false);

    const speeds = [
        2.0, 1.5, 1.0, 0.5];

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowSpeed(true)}
            onMouseLeave={() => setShowSpeed(false)}
        >
            {/* Botón de velocidad actual */}
            <button className="text-xl text-white rounded-full px-4 py-2 hover:text-green-500">
                {speed}x
            </button>

            {/* Opciones de velocidad de reproducción */}
            {showSpeed && (
                <div className="absolute bottom-8 m:bottom-8 flex flex-col items-start bg-gray-700 px-2 py-2 rounded-lg -translate-x-1/2 left-1/2 shadow-lg">
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
    const [showVolume, setShowVolume] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // Estado para manejar el arrastre

    const handleVolumeChange = (e) => {
        const newVolume = Math.max(0, Math.min(parseFloat(e.target.value), 100)); // Asegurar que el volumen esté en el rango
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            setVolume(100);
            setIsMuted(false);
        } else {
            setVolume(0);
            setIsMuted(true);
        }
    };

    // Maneja el clic en la barra de volumen para ajustar el volumen
    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - rect.top; // Posición Y del clic
        const height = rect.height; // Altura de la barra

        // Calcular el nuevo volumen basado en la posición del clic
        const newVolume = Math.round((1 - clickY / height) * 100); // Invertir ya que la parte inferior es 0%
        setVolume(Math.max(0, Math.min(newVolume, 100))); // Limitar el volumen entre 0 y 100
        setIsMuted(newVolume === 0);
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Maneja el movimiento del mouse cuando se arrastra
    const handleMouseMove = (e) => {
        if (isDragging) {
            handleClick(e); // Llama a la función de clic para ajustar el volumen
        }
    };

    return (
        <div
            className="relative ml-4"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => {
                setShowVolume(false);
                setIsDragging(false); // Asegúrate de que no siga arrastrando
            }}
        >
            {/* Contenedor grande que incluye el icono y el control deslizante */}
            <div className="flex items-center">
                {/* Icono de volumen */}
                <FiVolume2
                    className={`text-2xl cursor-pointer text-white hover:text-green-500 ${isMuted ? "text-red-500" : ""}`}
                    onClick={toggleMute}
                />

                {/* Control deslizante de volumen */}
                {showVolume && (
                    <div
                        className="absolute bottom-0 mb-9 flex flex-col items-center gap-3 bg-gray-800 p-4 rounded-lg shadow-lg -translate-x-1/2 left-1/2"
                        onClick={handleClick} // Manejar clic en la barra
                        onMouseDown={handleMouseDown} // Manejar inicio de arrastre
                        onMouseUp={handleMouseUp} // Manejar fin de arrastre
                        onMouseMove={handleMouseMove} // Manejar movimiento del mouse
                    >
                        <div className="relative w-4 h-36 bg-light-grey rounded-full overflow-hidden">
                            {/* Indicador de volumen */}
                            <div
                                className="absolute bottom-0 w-full bg-green-500 rounded-full"
                                style={{ height: `${volume}%` }}
                            />

                            {/* Control deslizante (thumb) */}
                            <div
                                className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-full w-4 h-4 cursor-pointer"
                                style={{ bottom: `calc(${volume}% - 8px)` }}
                            />
                        </div>

                        {/* Input range oculto para manejar la interacción */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="absolute opacity-0 h-full w-full cursor-pointer"
                            style={{
                                transformOrigin: 'bottom',
                            }}
                        />
                    </div>
                )}
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
