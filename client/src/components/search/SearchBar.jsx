import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchResultsList } from "./SearchResultsList";
import { getAudiobooks } from "../../api/api";
import debounce from "lodash.debounce";

function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [input, setInput] = useState(location.state?.input || ""); // Recuperar el estado previo
    const [audiobooks, setAudiobooks] = useState([]);
    const [results, setResults] = useState([]);
    const [aparecer, setAparecer] = useState(false);

    // Llamada inicial a la API para obtener todos los audiolibros
    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await getAudiobooks();
                if (Array.isArray(response.data)) {
                    setAudiobooks(response.data);
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]);
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]);
            }
        };

        fetchAudiobooks();
    }, []);

    // Lógica de búsqueda con debounce
    const filterResults = debounce((value) => {
        if (value) {
            const filteredResults = audiobooks.filter(
                (audiobook) =>
                    audiobook.title.toLowerCase().includes(value.toLowerCase()) ||
                    audiobook.author.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filteredResults.slice(0, 5));
        } else {
            setResults([]);
        }
    }, 300);

    const handleInputChange = (value) => {
        if (value.length < 100) {
            setInput(value);
            setAparecer(true);
            filterResults(value);
        } else {
            alert("Por favor, usa menos de 100 caracteres");
        }
    };

    const handleSearch = () => {
        if (input.trim()) {
            navigate("/buscar", { state: { input, results } }); // Pasar el estado del input
            setResults([]);
            setAparecer(false);
        } else {
            alert("El campo de búsqueda está vacío");
        }
    };

    return (
        <div className="flex justify-center w-full px-4 flex-col md:flex-row md:justify-start">
            <div className="relative mb-3 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl">
                <div className="relative flex items-center">
                    <input
                        type="search"
                        className="h-[40px] w-full rounded-l-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 placeholder-gray-500 transition duration-200 ease-in-out focus:ring-2 focus:ring-slate-500 focus:outline-none"
                        placeholder="Buscar por título o autor"
                        aria-label="Buscar por título o autor"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        className="h-[40px] flex items-center justify-center bg-slate-500 rounded-r-lg px-4 py-2 text-white cursor-pointer hover:bg-slate-600 transition duration-200 ease-in-out"
                        onClick={handleSearch}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Resultados de la búsqueda */}
                {aparecer && results.length > 0 && (
                    <div
                        id="lista-de-resultados"
                        className="absolute text-black flex-col shadow-lg rounded-lg max-h-[300px] overflow-y-scroll z-50 mt-1 transition-all"
                        style={{ width: "100%" }}
                    >
                        {results.map((audiobook) => (
                            <SearchResultsList
                                key={audiobook.id}
                                results={audiobook}
                                setInput={setInput}
                                setResults={setResults}
                                setAparecer={setAparecer}
                            />
                        ))}
                        {results.length === 5 && (
                            <div
                                className="dark:bg-gray-800 dark:hover:bg-gray-700 font-semibold text-center cursor-pointer text-teal-600 hover:underline py-2"
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
