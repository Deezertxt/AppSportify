import React, { useState } from "react";

const ProgressBar = ({ progress, totalDuration, onProgressChange }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [buttonPosition, setButtonPosition] = useState(0);

    const handleClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * totalDuration;
        onProgressChange(newProgress);
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const rect = event.target.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const newProgress = (offsetX / rect.width) * totalDuration;
            onProgressChange(newProgress);
        }
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (!isDragging) {
            setButtonPosition((progress / totalDuration) * 100);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div 
            className="w-full flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{ position: 'relative' }}
        >
            <span className="text-white">{formatTime(progress)}</span>
            <div
                className="flex-grow h-2 bg-white rounded-full relative mx-4 cursor-pointer"
                onClick={handleClick}
                style={{ maxWidth: '90%' }}
            >
                <div
                    className="bg-gray-500 h-full"
                    style={{ width: `${(progress / totalDuration) * 100}%` }}
                ></div>
                {/* Botón para deslizar */}
                {isHovering && (
                    <div
                        className="absolute bg-sky-100 rounded-full"
                        style={{
                            left: `calc(${(buttonPosition || (progress / totalDuration) * 100)}% - 6px)`, // Ajusta la posición del botón
                            width: '12px',
                            height: '16px', // Aumenta la altura para sobresalir
                            cursor: 'pointer',
                            transform: 'translateY(-50%)', // Centra verticalmente
                            top: '50%', // Centra en la barra
                        }}
                        onMouseDown={() => setIsDragging(true)}
                    ></div>
                )}
            </div>
            <span className="text-white">{formatTime(totalDuration)}</span>
            {isDragging && (
                <div onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)} />
            )}
        </div>
    );
};

export default ProgressBar;






