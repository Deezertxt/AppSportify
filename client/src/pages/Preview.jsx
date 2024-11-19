import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiBookmark, FiClock, FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SlEarphonesAlt ,SlBookOpen } from "react-icons/sl";
import { getAudiobooks, addBookToLibraryCategory } from "../api/api";
import { useAuth } from "../context/authContext";
import { useLibrary } from "../context/libraryContext";

function Preview() {
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const { user } = useAuth(); // Obtener la información del usuario
  const { 
    isBookSaved, 
    addToSaved, 
    initializeLibrary 
  } = useLibrary(); // Obtener funciones del contexto de biblioteca

  // Inicializar la biblioteca al cargar el componente
  useEffect(() => {
    if (user?.userId) {
      initializeLibrary(user.userId);
    }
  }, [user?.userId, initializeLibrary]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await getAudiobooks();
        if (Array.isArray(response.data)) {
          const foundBook = response.data.find((book) => book.id === parseInt(id, 10));
          if (foundBook) {
            setBookData(foundBook);
          } else {
            console.error(`No se encontró un libro con el id: ${id}`);
          }
        } else {
          console.error("La respuesta no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching audiobooks:", error);
      }
    };

    fetchBookData();
  }, [id]);

  const handleSaveToLibrary = async () => {
    if (isBookSaved(parseInt(id, 10))) return;
    try {
      const response = await addBookToLibraryCategory({
        firebaseUserId: user.userId,
        audiobookId: parseInt(id, 10),
        category: "saved",
      });
      if (response.status === 200) {
        addToSaved(parseInt(id, 10)); // Actualiza el estado global
        alert("Audiolibro guardado en la biblioteca.");
      } else {
        alert("Error al guardar el audiolibro.");
      }
    } catch (error) {
      console.error("Error al guardar el audiolibro:", error);
      alert("Error al guardar el audiolibro.");
    }
  };

  if (!bookData) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const { title, author, description, coverUrl, duration, averageRating } = bookData;

  return (
    <div className="min-h-0 bg-second">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Botón de retroceso */}
        <button
          onClick={() => navigate(-1)}
          className="text-black font-bold mb-6 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Volver
        </button>

        {/* Información del libro */}
        <section className="flex flex-col md:flex-row items-start md:items-center w-full bg-gray-50 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:w-1/3">
            <img
              src={coverUrl}
              alt="Book Cover"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col p-4 md:p-6 w-full md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-lg font-semibold mb-1">Autor:</p>
            <p className="text-lg text-gray-500 font-semibold">{author}</p>
            <div className="flex space-x-4 mt-4 text-gray-700">
              <span className="flex items-center">
                <FiClock className="mr-2" /> {duration}
              </span>
              <span className="flex items-center">
                <FiStar className="mr-2" /> {averageRating}
              </span>
            </div>

            {/* Botones de acciones */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => navigate(`/reproductor/${id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center space-x-2"
              >
                <SlBookOpen />
                <span>Ver</span>
              </button>
              <button
                onClick={() => navigate(`/escuchar/${id}`)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center space-x-2"
              >
                <SlEarphonesAlt />
                <span>Escuchar</span>
                </button>
            </div>

            {/* Descripción */}
            <section className="mt-6">
              <h3 className="text-lg font-semibold">Descripción</h3>
              <p className="text-gray-700 mt-2">{description}</p>
            </section>

            {/* Botón de guardar en biblioteca */}
            <button
              onClick={handleSaveToLibrary}
              className={`flex items-center mt-6 ${
                isBookSaved(parseInt(id, 10))
                  ? "text-blue-600"
                  : "text-blue-400 hover:text-blue-800"
              } font-semibold py-2 px-4 transition-colors duration-300 `}
              disabled={isBookSaved(parseInt(id, 10))} // Deshabilitar si ya está guardado
            >
              <FiBookmark className={`mr-2 ${isBookSaved(parseInt(id, 10)) ? "fill-current" : ""}`} />
              {isBookSaved(parseInt(id, 10)) ? "Guardado en Biblioteca" : "Guardar en mi Biblioteca"}
            </button>
          </div>
        </section>
      </main>
      <div id='commentsSection'>
          <Comments/>
      </div>
    </div>
  );
}

export default Preview;
