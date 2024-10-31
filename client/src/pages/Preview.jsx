import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getAudiobooks } from '../api/api';

function Preview() {
    const { id } = useParams(); // Obtener el id desde la URL
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [audiobooks, setAudiobooks] = useState([]); 


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
        return <div className="flex items-center justify-center h-screen">Cargando...</div>;
    }

    const { title, author, description, coverUrl, duration } = bookData;

    return (
        <div className="min-h-screen bg-white">
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
                            <span className="flex items-center">⏱ {duration}</span>
                        </div>
                        {/* Botones de acciones */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={() => alert("Ver detalles del libro")}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                            >
                                Ver
                            </button>
                            <button
                                onClick={() => alert("Escuchar el libro")}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                            >
                                Escuchar
                            </button>
                        </div>
                    </div>
                </section>

                {/* Descripción */}
                <section className="mt-6">
                    <h3 className="text-lg font-semibold">Descripción</h3>
                    <p className="text-gray-700 mt-2">{description}</p>
                </section>
            </main>
        </div>
    );
}

export default Preview;
