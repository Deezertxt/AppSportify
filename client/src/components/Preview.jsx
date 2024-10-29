import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Actions({ audiobookId }) {
  const navigate = useNavigate();

  const handleListenClick = () => {
    navigate(`/reproductor/${audiobookId}`);
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="bg-emerald-300 text-black border-2 border-black font-bold py-2 px-4 rounded"
        onClick={handleListenClick}
      >
        Escuchar
      </button>

      <button
        className="bg-emerald-300 text-black border-2 border-black font-bold py-2 px-4 rounded"
        onClick={handleListenClick}
      >
        Leer
      </button>
    </div>
  );
}

function Preview({
  id,
  coverImage,
  title,
  author,
  description,
  duration,
}) {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto p-4">
        {/* Botón de retroceso */}
        <button className="text-black font-bold mb-4 flex items-center">
          <FaArrowLeft className="mr-2" />
          Volver
        </button>

        {/* Información del libro */}
        <section className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <img
            src={coverImage}
            alt="Book Cover"
            className="w-full md:w-48 md:h-64 transition-transform duration-300 hover:scale-105 object-cover" // Aumentar tamaño y agregar animación
          />
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-lg font-semibold">Autor:</p>
            <p className="text-lg text-gray-500 font-semibold">{author}</p>
            <div className="flex space-x-4 mt-2 text-gray-700">
              <span>⏱ {duration}</span>
            </div>
          </div>
        </section>

        {/* Botones de acción */}
        <Actions audiobookId={id} />

        {/* Descripción */}
        <section className="mt-4">
          <h3 className="text-lg font-semibold">Descripción</h3>
          <p className="text-gray-700 mt-2">
            {description}
          </p>
        </section>
      </main>
    </div>
  );
}

export default Preview;
