import Header from '../components/Header';
import Actions from '../components/Actions';

function Libro() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        {/* Información del libro */}
        <section className="flex items-center space-x-4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fddd.webp?alt=media&token=0c9bd3e5-3da9-4fc6-8c3b-5ec97791d6c4" alt="Logo" className="w-12 h-12"
            alt="Book Cover"
            className="w-32 h-48"
          />
          <div>
            <h2 className="text-2xl font-bold">Reyes caidos</h2>
            <p className="text-lg text-gray-500">nombre de autor aaas d</p>
            <p className="text-sm text-gray-700 mt-2">
              Descripcion pequeña del contexto del audiolibro  xd 
            </p>
            <div className="flex space-x-4 mt-2 text-gray-700">
              <span>⏱ 19 minutos</span>
              <span>📄 Audio y texto</span>
              <span>💡 8 ideas clave</span>
            </div>
          </div>
        </section>

        {/* Botones de acción */}
        <Actions />

        {/* Etiquetas */}
        <div className="flex space-x-2 mt-4">
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
            Habilidades de comunicación
          </span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded">
           Categoria y mas 
          </span>
        </div>

        {/* Descripción */}
        <section className="mt-4">
          <h3 className="text-lg font-semibold">Descripcion o resumen</h3>
          <p className="text-gray-700 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque illum repellendus voluptas impedit ab! Velit quibusdam in sunt iure, ad dolor amet perspiciatis at voluptatum ea magnam architecto laboriosam maiores!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid reiciendis nulla earum cumque. Voluptates numquam debitis labore maiores odit explicabo, earum ea qui eligendi eum doloremque at praesentium quia veniam?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque totam similique eos expedita pariatur excepturi repudiandae quidem? Fuga modi quasi officiis quisquam tenetur exercitationem, molestiae soluta eveniet sunt mollitia dicta!
              
          </p>
        </section>

        {/* Información del autor */}
        <section className="mt-4">
          <h3 className="text-lg font-semibold">Acerca del autor</h3>
          <p className="text-gray-700 mt-2">
            Robert Greene es un autor de gran éxito. Escribió 48 leyes del poder y Las 33 estrategias de la guerra y Maestría. Tiene un título en estudios clásicos.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Libro;
