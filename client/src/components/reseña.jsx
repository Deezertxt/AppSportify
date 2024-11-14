import React, { useState } from 'react';

const Reseña = () => {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Mensaje de éxito desaparece después de 3 segundos
  };

  return (
    <div className="bg-blue-100 p-8 rounded-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-blue-900">Cuéntanos qué piensas de</h2>
      <p className="italic text-lg mb-6 text-gray-700">Conviértete en lo que eres de Alan Watts</p>
      
      <div className="flex justify-center items-center mb-4">
        <img
          src="https://storage.googleapis.com/sportify-2/uploads/covers/imagen_2024-11-14_141600748.png" // Cambia esto por la ruta a la imagen que desees
          alt="Conversación"
          className="h-24 w-24"
        />
      </div>

      <h3 className="text-xl font-semibold mb-4 text-center">¿Cómo lo calificarías?</h3>

      <div className="flex justify-center mb-4 space-x-2">
        {["Horrible", "Malo", "Bueno", "Bien", "Impresionante"].map((label, index) => (
          <button
            key={index}
            onClick={() => handleRating(index + 1)}
            className={`text-2xl ${rating === index + 1 ? 'text-blue-500' : 'text-gray-400'}`}
          >
            ★
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mb-6 text-gray-500">
        {["Horrible", "Malo", "Bueno", "Bien", "Impresionante"].map((label, index) => (
          <span key={index} className="text-sm">{label}</span>
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
