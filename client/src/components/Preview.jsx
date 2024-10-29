import Actions from '../components/Actions';

function Preview({
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
        <button className="text-black font-bold mb-4">{"<"} Volver</button>
        
        {/* Información del libro */}
        <section className="flex items-center space-x-4">
          <img
            src={coverImage}
            alt="Book Cover"
            className="w-32 h-48"
          />
          <div>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-gray-500 font-semibold">{author}</p>
            {/* <p className="text-sm text-gray-700 mt-2">
              {description}
            </p> */}
            <div className="flex space-x-4 mt-2 text-gray-700">
              <span>⏱ {duration}</span>
            </div>
          </div>
        </section>

        {/* Botones de acción */}
        <Actions />

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