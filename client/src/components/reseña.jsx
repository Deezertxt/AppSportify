import React, { useState } from 'react';

const Reseña = () => {
  const [rating, setRating] = useState(null); // Estado para la calificación seleccionada
  const [hoverRating, setHoverRating] = useState(null); // Estado para el hover
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rate) => {
    setRating(rate); // Guardar la selección final
  };

  const handleMouseEnter = (rate) => {
    setHoverRating(rate); // Marcar las estrellas en hover
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // Restaurar cuando el cursor salga
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const labels = ["Horrible", "Malo", "Bueno", "Bien", "Exelente"];

  return (
    <div className="bg-blue-100 p-8 rounded-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-blue-900">Cuéntanos qué piensas de</h2>
      <p className="italic text-lg mb-6 text-gray-700">Conviértete en lo que eres de Alan Watts</p>
      
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://storage.googleapis.com/sportify-2/uploads/covers/imagen_2024-11-14_141600748.png" 
          alt="Conversación"
          className="h-24 w-24"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4 text-center">¿Cómo lo calificarías?</h3>

      <div className="flex justify-center mb-4 space-x-4">
        {labels.map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => handleRating(index + 1)}
              onMouseEnter={() => handleMouseEnter(index + 1)} // Resaltar en hover
              onMouseLeave={handleMouseLeave} // Restaurar al salir del hover
              className={`text-6xl ${hoverRating >= index + 1 ? 'text-blue-700' : rating >= index + 1 ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-200`}
            >
              ★
            </button>
            {/* Mostrar el texto debajo de la estrella seleccionada */}
            {rating === index + 1 && (
              <span className="text-sm mt-2 text-gray-500">{label}</span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className={`w-full py-2 rounded-md ${rating ? 'bg-blue-500 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
        disabled={!rating}
      >
        Enviar comentarios
      </button>

      {submitted && (
        <div className="mt-4 text-center text-green-500">¡Reseña enviada exitosamente!</div>
      )}

      <button className="mt-4 text-gray-500 underline text-sm" onClick={() => setRating(null)}>
        Saltar
      </button>
    </div>
  );
};

export default Reseña;
