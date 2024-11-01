import React from "react";

const ControlButtons = ({ isPlaying, togglePlay, handleBackward, handleForward }) => (
  <div className="flex items-center space-x-6">
    {/* Botón de Retroceder -15 */}
    <button id="backward" onClick={handleBackward} className="relative group flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12 transition"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="none" />
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
      <span className="absolute text-white text-xs font-semibold inset-0 flex items-center justify-center transition group-hover:text-green-500">
        -10
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-12 w-12 inset-0 flex items-center justify-center transition group-hover:text-green-500"
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>

    {/* Botón de Play/Pause */}
    <button id="play-pause" onClick={togglePlay} className="group flex items-center justify-center">
      <div className="relative">
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 transition group-hover:text-green-500"
          >
            {/* Se quita el relleno blanco del círculo */}
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
            <path d="M10 15V9M14 15V9" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-16 w-16 transition group-hover:text-green-500"
          >
            {/* Se quita el relleno blanco del círculo */}
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        )}
      </div>
    </button>

    {/* Botón de Adelantar +15 */}
    <button id="forward" onClick={handleForward} className="relative group flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-12 w-12 transition"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="none" />
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
      <span className="absolute text-white text-xs font-semibold inset-0 flex items-center justify-center transition group-hover:text-green-500">
        +10
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-12 w-12 inset-0 flex items-center justify-center transition group-hover:text-green-500"
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    </button>
  </div>
);

export default ControlButtons;





