import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reseña = () => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRating = (rate) => {
    setRating(rate);
  };

  const RedirigirInicio = () => {
    navigate(`/libros`);
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
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Encabezado */}
      <div className="bg-[#ABDADC] w-full py-10 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Cuéntanos qué piensas de
          </h2>
          <p className="italic text-lg md:text-xl text-blue-700 mt-2">
            Purpose Mindset de Akhtar Badshah
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/3 flex justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fholis.jpg?alt=media&token=fec38952-f2eb-416b-9cc6-fd3de2375d64"
            alt="Conversación"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-xl bg-white px-6 py-8 mt-1   rounded-md">
        <h3 className="text-xl font-semibold mb-6 text-center text-blue-900">
          ¿Cómo lo calificarías?
        </h3>

        <div className="flex justify-center mb-4 space-x-6">
          {labels.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => handleRating(index + 1)}
                onMouseEnter={() => handleMouseEnter(index + 1)}
                onMouseLeave={handleMouseLeave}
                className={`text-6xl ${
                  hoverRating >= index + 1
                    ? 'text-blue-700'
                    : rating >= index + 1
                    ? 'text-blue-500'
                    : 'text-gray-300'
                } transition-colors duration-200`}
              >
                ★
              </button>
              {/* Etiqueta visible solo cuando se selecciona */}
              {rating === index + 1 && (
                <span className="text-sm mt-2 text-gray-700">{label}</span>
              )}
            </div>
          ))}
        </div>

        {rating && rating <= 5 && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center text-blue-900">
              ¿Algo más que quieras compartir?
            </h3>
            <textarea
              className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comparte tus pensamientos..."
              rows="3" // Mayor altura
            ></textarea>

            <h3 className="text-lg font-semibold mt-6 mb-2 text-center text-blue-900">
              ¿Aprendiste algo nuevo?
            </h3>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="text-2xl text-gray-500 hover:text-blue-700">
                👎
              </button>
              <button className="text-2xl text-gray-500 hover:text-blue-700">
                👍
              </button>
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          className={`w-full py-2 px-8 text-lg rounded-md mt-2 ${
            rating ? 'bg-[#16697A] text-white' : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={!rating}
        >
          Enviar comentarios
        </button>

        {submitted && (
          <div className="mt-4 text-center text-green-500">
            ¡Reseña enviada exitosamente!
          </div>
        )}

        <button
          onClick={RedirigirInicio}
          className="mt-4 text-blue-500 underline text-sm block text-center py-3 px-8 text-lg"
        >
          Saltar
        </button>
      </div>
    </div>
  );
};

export default Reseña;
