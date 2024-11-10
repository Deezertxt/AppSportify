import React from "react";

const ControlButtons = ({ isPlaying, togglePlay, handleBackward, handleForward, handleRestart, hasEnded }) => {
  return (
    <div className="flex items-center space-x-6">
      {/* Botón de Retroceder -10 */}
      <button id="backward" onClick={handleBackward} className="relative group flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 transition group-hover:text-green-500">
          <circle cx="12" cy="12" r="10" fill="none" stroke="none" />
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span className="absolute text-white text-xs font-semibold inset-0 flex items-center justify-center transition group-hover:text-green-500">
          -10
        </span>
      </button>

      {/* Botón de Play/Pause o Reanudar */}
      <button
        id="play-pause"
        onClick={hasEnded ? handleRestart : togglePlay}
        className="group flex items-center justify-center"
      >
        <div className="relative">
          {hasEnded ? (
            // Icono de "Reiniciar desde el principio" cuando el audio termina
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 transition group-hover:text-green-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
              <path d="M9 10a4 4 0 1 1 1 5" />
              <polyline points="8 8 7 11 11 11" />
            </svg>
          ) : isPlaying ? (
            // Icono de Pause
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 transition group-hover:text-green-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
              <path d="M10 15V9M14 15V9" />
            </svg>
          ) : (
            // Icono de Play
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 transition group-hover:text-green-500">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
              <polygon points="10 8 16 12 10 16 10 8" />
            </svg>
          )}
        </div>
      </button>

      {/* Botón de Adelantar +10 */}
      <button id="forward" onClick={handleForward} className="relative group flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 transition group-hover:text-green-500">
          <circle cx="12" cy="12" r="10" fill="none" stroke="none" />
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
        <span className="absolute text-white text-xs font-semibold inset-0 flex items-center justify-center transition group-hover:text-green-500">
          +10
        </span>
      </button>
    </div>
  );
};

export default ControlButtons;
