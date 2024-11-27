import React from "react";
import { FiBookmark } from "react-icons/fi";

const AudioDetails = ({ title, author, isSaved, onSave }) => (
  <div className="flex items-center">
    <div className="flex flex-col mr-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-white">{author}</p>
    </div>
    <button
      onClick={onSave} // Aquí se maneja tanto para guardar como para eliminar
      className="text-2xl cursor-pointer transition"
      aria-label={isSaved ? "Eliminar de la biblioteca" : "Guardar en la biblioteca"}
      disabled={false} // Se puede dejar habilitado siempre
    >
      <FiBookmark
        className={`${
          isSaved ? "fill-current text-green-600" : "text-white hover:text-green-600"
        }`}
      />
    </button>
  </div>
);

export default AudioDetails;
