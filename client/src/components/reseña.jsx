import React, { useState } from 'react';

const Reseña = () => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleMouseEnter = (rate) => {
    setHoverRating(rate);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

 

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const labels = ["Horrible", "Malo", "Bueno", "Bien", "Excelente"];
  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-900">Cuéntanos qué piensas de</h2>
        <p className="italic text-lg mb-6 text-center text-gray-700">Conviértete en lo que eres de Alan Watts</p>
        
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
                onMouseEnter={() => handleMouseEnter(index + 1)}
                onMouseLeave={handleMouseLeave}
                className={`text-6xl ${hoverRating >= index + 1 ? 'text-blue-700' : rating >= index + 1 ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-200`}
              >
                ★
              </button>
              {rating === index + 1 && (
                <span className="text-sm mt-2 text-gray-500">{label}</span>
              )}
            </div>
          ))}
        </div>

        {rating && rating <= 5 && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center">¿Algo más que quieras compartir?</h3>
            <textarea
              className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comparte tus pensamientos..."
            ></textarea>

            <h3 className="text-lg font-semibold mt-4 mb-2 text-center">¿Aprendiste algo nuevo?</h3>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="text-2xl text-gray-500 hover:text-blue-700">👎</button>
              <button className="text-2xl text-gray-500 hover:text-blue-700">👍</button>
            </div>
          </>
        )}

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
    </div>
  );
};

export default Reseña;
