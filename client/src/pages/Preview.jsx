import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiBookmark, FiClock, FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";
import { SlEarphonesAlt, SlBookOpen } from "react-icons/sl";
import { getAudiobooks, addBookToLibraryCategory, deleteBookFromLibraryCategory } from "../api/api";
import { useAuth } from "../context/authContext";
import { useLibrary } from "../context/libraryContext";
import { Comments } from "../components/Comments/Comments";
import ModalReu from "../components/modals/ModalReu";

function Preview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const { user } = useAuth();
  const { isBookSaved, addToSaved, removeFromSaved, initializeLibrary } = useLibrary();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

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
        userId: user.userId,
        audiobookId: parseInt(id, 10),
        category: "saved",
      });
      if (response.status === 200) {
        addToSaved(parseInt(id, 10));
        setModalType("success");
        setModalTitle("¡Éxito!");
        setModalMessage("Audiolibro guardado en la biblioteca.");
        setModalVisible(true);
      } else {
        setModalType("error");
        setModalTitle("¡Error!");
        setModalMessage("Error al guardar el audiolibro.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error al guardar el audiolibro:", error);
      setModalType("error");
      setModalTitle("¡Error!");
      setModalMessage("Ocurrió un error al guardar el audiolibro.");
      setModalVisible(true);
    }
  };
  const handleRemoveFromLibrary = async () => {
    try {
      const response = await deleteBookFromLibraryCategory(user.userId, parseInt(id, 10), "saved");
      if (response.status === 200) {
        removeFromSaved(parseInt(id, 10)); // Elimina el libro de la biblioteca localmente
        setModalType("success");
        setModalTitle("¡Éxito!");
        setModalMessage("Audiolibro eliminado de la biblioteca.");
        setModalVisible(true);
      } else {
        setModalType("error");
        setModalTitle("¡Error!");
        setModalMessage("Error al eliminar el audiolibro.");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error al eliminar el audiolibro:", error);
      setModalType("error");
      setModalTitle("¡Error!");
      setModalMessage("Ocurrió un error al eliminar el audiolibro.");
      setModalVisible(true);
    }
  };

  if (!bookData) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const { title, author, description, coverUrl, duration, averageRating } = bookData;

  return (
    <div className=" min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Botón de retroceso */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center  hover:text-gray-500 mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Volver
        </button>

        {/* Información del audiolibro */}
        <section className="shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={coverUrl}
              alt="Book Cover"
              className="w-full object-contain"
            />
          </div>
          <div className="flex flex-col p-6 space-y-4 md:w-2/3">
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
            <p className="text-lg font-medium">Autor: {author}</p>
            <div className="flex flex-wrap space-x-4">
              <span className="flex items-center">
                <FiClock className="mr-2" /> {duration}
              </span>
              <span className="flex items-center">
                <FiStar className="mr-2" /> {averageRating}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
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
            <h3 className="text-lg sm:text-xl font-bold">Descripción</h3>
            <p
              className="mt-2 text-sm sm:text-base leading-relaxed break-words"
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {description}
            </p>

            <button
              onClick={isBookSaved(parseInt(id, 10)) ? handleRemoveFromLibrary : handleSaveToLibrary}
              className={`flex items-center mt-6 ${isBookSaved(parseInt(id, 10))
                ? "text-blue-700 hover:text-blue-900"
                : "text-blue-400 hover:text-blue-800"
                } font-semibold py-2 px-4 transition-colors duration-300`}
            >
              <FiBookmark
                className={`mr-2 ${isBookSaved(parseInt(id, 10)) ? "fill-current" : ""
                  }`}
              />
              {isBookSaved(parseInt(id, 10))
                ? "Eliminar de mi Biblioteca"
                : "Guardar en mi Biblioteca"}
            </button>
          </div>
        </section>


        {/* Sección de comentarios */}
        <section id="commentsSection" className="mt-3">
          <Comments currentBookId={id} currentUserId={user} />
        </section>
      </main>

      {/* Modal */}
      {modalVisible && (
        <ModalReu
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
          type={modalType}
        />
      )}
    </div>
  );
}

export default Preview;
