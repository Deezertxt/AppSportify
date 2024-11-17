import React, { useState ,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getAudiobooks } from '../api/api';
import { BiSolidDislike ,BiSolidLike    } from "react-icons/bi";
import Modal from '../pages/Modal';
const Reseña = () => {
  const { id ,idUser} = useParams(); 
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [audiobooks, setAudiobooks] = useState([]);
  

  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await getAudiobooks();
        if (Array.isArray(response.data)) {
          setAudiobooks(response.data);

          const foundBook = response.data.find(book => book.id === parseInt(id, 10));
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
  if (!bookData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-t-4 border-teal-600 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }
  

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
    setShowModal(true); 
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(false); 
    }, 5000);
  };

  const labels = ["Horrible", "Malo", "Bueno", "Bien", "Excelente"];
  const { title, author , coverUrl,  } = bookData;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
     
      <div className="bg-[#ABDADC] w-full py-10 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
            Cuéntanos qué piensas de 
          </h2>
          <p className="italic text-lg md:text-xl text-blue-700 mt-2">
            {title} de {author}  {rating}   idAudilibro = {id}  idUSUARIO = {idUser}
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/3 flex justify-center">
          <img
            src=  {coverUrl}
            alt="Conversación"
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>
      </div>

      
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
                    ? 'text-yellow-500'
                    : rating >= index + 1
                    ? 'text-yellow-300'
                    : 'text-gray-300'
                } transition-colors duration-200`}
              >
                ★
              </button>
             
              {rating === index + 1 && (
                <span className="text-sm mt-2 text-gray-700">{label}</span>
              )}
            </div>
          ))}
        </div>

        {rating && rating <= 5 && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center text-blue-900">
              ¿Algo más que quieras compartir ? 
            </h3> 
            <textarea
             
              className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Comparte tus pensamientos..."
              rows="3" 
            ></textarea>

            <h3 className="text-lg font-semibold mt-6 mb-2 text-center text-blue-900">
              ¿Aprendiste algo nuevo?
            </h3>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="text-2xl text-gray-500 hover:text-blue-700">
              <BiSolidDislike />


              </button>
              <button className="text-2xl text-gray-500 hover:text-blue-700">
              <BiSolidLike />

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
        <Modal onClose={() => setSubmitted(false)}
        title="¡Reseña enviada exitosamente!"
          message="Tu opinión ha sido registrada. ¡Gracias por tus comentarios!"
        />
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
