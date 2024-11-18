import React from "react";
import { FiBookmark } from "react-icons/fi";

const AudioDetails = ({ title, author, isSaved, onSave }) => (
  <div className="flex items-center">
    <div className="flex flex-col mr-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-white">{author}</p>
    </div>
    <button
      onClick={onSave}
      className={`text-2xl cursor-pointer transition ${
        isSaved ? "text-green-600" : "text-white hover:text-green-600"
      }`}
      aria-label="Guardar en la biblioteca"
      disabled={isSaved} // Deshabilitar si ya está guardado
    >
      <FiBookmark
        className={`${
          isSaved ? "fill-current text-green-600" : "text-white"
        }`}
      />
    </button>
  </div>
);

export default AudioDetails;
