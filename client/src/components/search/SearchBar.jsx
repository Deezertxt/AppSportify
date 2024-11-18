import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResultsList } from "./SearchResultsList";
import { getAudiobooks } from "../../api/api";
import debounce from "lodash.debounce"; // Asegúrate de tener lodash instalado para el debounce

function SearchBar() {
    const [input, setInput] = useState("");
    const [audiobooks, setAudiobooks] = useState([]);
    const [results, setResults] = useState([]);
    const [aparecer, setAparecer] = useState(false);
    const navigate = useNavigate();

    // Llamada inicial a la API para obtener todos los audiolibros
    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await getAudiobooks(); // Llamada a la API
                if (Array.isArray(response.data)) {
                    setAudiobooks(response.data); // Guardamos los audiolibros
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]); // Estado vacío en caso de error
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]); // Estado vacío en caso de error
            }
        };

        fetchAudiobooks();
    }, []);

    // Lógica de búsqueda con debounce para optimizar las consultas
    const filterResults = debounce((value) => {
        if (value) {
            const filteredResults = audiobooks.filter(
                (audiobook) =>
                    audiobook.title.toLowerCase().includes(value.toLowerCase()) ||
                    audiobook.author.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults.slice(0, 4)); // Limitar a los primeros 4 resultados
        } else {
            setResults([]); // Limpiar los resultados si no hay texto
        }
    }, 300); // Esperar 300ms después de la última escritura antes de realizar el filtrado

    const handleInputChange = (value) => {
        if (value.length < 100) {
            setInput(value);
            setAparecer(true);
            filterResults(value); // Aplicamos el debounce
        } else {
            alert("Por favor, usa menos de 100 caracteres");
        }
    };

    const handleSearch = () => {
        if (input.trim()) {
            navigate("/buscar", { state: { input, results } });
            setResults([]);
            setAparecer(false);
        } else {
            alert("El campo de búsqueda está vacío");
        }
    };

    return (
        <div className="flex justify-end w-full px-4 flex-col md:flex-row md:justify-start">
            <div className="mb-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="relative flex items-center">
                    <input
                        type="search"
                        className="h-[38px] w-full rounded-l border border-solid border-gray-300 bg-white px-2 py-1 text-sm font-normal text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out focus:z-[3] focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="Buscar por título, autor o categoría"
                        aria-label="Buscar por título, autor o categoría"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        className="h-[38px] flex items-center justify-center bg-orange-500 rounded-r px-2 py-1 text-white cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out"
                        onClick={handleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                {aparecer && results.length > 0 && (
                    <div
                        id="lista-de-resultados"
                        className="absolute w-full bg-white text-black flex-col shadow-md rounded-lg max-h-[300px] overflow-y-scroll z-50 mt-1"
                    >
                        {results.map((audiobook, id) => (  // Cambié 'results' por 'audiobook'
                            <SearchResultsList
                                key={audiobook.id}
                                results={audiobook} // Corregido: ahora pasamos un 'audiobook' individual
                                setInput={setInput}
                                setResults={setResults}
                                setAparecer={setAparecer}
                            />
                        ))}
                        {results.length === 4 && (
                            <div
                                className="font-bold hover:underline pl-4 cursor-pointer"
                                onClick={handleSearch}
                            >
                                Ver todos los resultados...
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}

export default SearchBar;
