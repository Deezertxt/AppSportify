import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchResultsList } from "./SearchResultsList";

function SearchBar() {
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [aparecer, setAparecer] = useState(false);

    const fetchData = (value) => {
        fetch("http://localhost:3000/api/audiobook/get/")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((audiobook) => {
                    return (
                        (value &&
                            audiobook &&
                            audiobook.title &&
                            audiobook.title
                                .toLowerCase()
                                .includes(value.toLowerCase())) ||
                        (audiobook.author &&
                            audiobook.author
                                .toLowerCase()
                                .includes(value.toLowerCase()))
                    );
                });
                setResults(results.slice(0, 4));
            });
    };

    const handlechange = (value) => {
        if (value.length < 100) {
            setInput(value);
            setAparecer(true);
            if (value === "") {
                setResults([]);
                setAparecer(false);
            } else {
                fetchData(value);
            }
        } else {
            alert("menos de 100 caracteres");
        }
    };

    const find = (entrada) => {
        navigate("/buscar", { state: { input } });
        setResults([]);
    };

    return (
        <div className="flex justify-end w-full px-4">
            <div className="mb-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="relative flex items-center">
                    <input
                        type="search"
                        className="w-full rounded-l border border-solid border-gray-300 bg-white px-2 py-1 text-sm font-normal text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out focus:z-[3] focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="Buscar por titulo, autor o categoria"
                        aria-label="Buscar por titulo, autor o categoria"
                        value={input}
                        onChange={(e) => handlechange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                find(input);
                            }
                        }}
                    />
                    <button
                        className="h-[38px] flex items-center justify-center bg-orange-500 rounded-r px-2 py-1 text-white cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out"
                        onClick={() => find(input)}
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
                {aparecer && (
                    <div
                        id="lista-de-resultados"
                        className="absolute w-full bg-white text-black flex-col shadow-md rounded-lg max-h-[300px] overflow-y-scroll z-50 mt-1"
                    >
                        {results.map((results, id) => (
                            <SearchResultsList
                                results={results}
                                key={id}
                                setInput={setInput}
                                setResults={setResults}
                            />
                        ))}
                        {results.length === 4 && (
                            <div
                                className="font-bold hover:underline pl-4 cursor-pointer"
                                onClick={() => find(input)}
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
