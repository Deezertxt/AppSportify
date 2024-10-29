import Actions from '../components/Actions';
import { FaArrowLeft } from 'react-icons/fa';

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
        <button className="text-black font-bold mb-4 items-center">
          <FaArrowLeft className="mr-2" />
        </button>

        {/* Información del libro */}
        <section className="flex items-center space-x-4">
          <img
            src={coverImage}
            alt="Book Cover"
            className="w-32 h-48"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg font-semibold">Autor:</p>
            <p className="text-lg text-gray-500 font-semibold"> {author}</p>
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