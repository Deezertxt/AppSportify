import React, { useState } from "react";

import {
    getAudiobooksByAuthor,
    getAudiobooksByCategory,
    getAudiobooksByTitle,
} from "../api/api";

function Search({ setResults }) {
    const [input, setInput] = useState("");
    const [botonColores, setBotonColores] = useState([false, false, false, false]);
    const nombresBotones = ["Todos", "Titulo", "Autor", "Categoria"];

    //colores botones
    const handleButtonClick = (i) => {
        const nuevoColor = [...botonColores];
        nuevoColor[i] = !nuevoColor[i];
        setBotonColores(nuevoColor);
    };

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.name &&
                        user.name.toLowerCase().includes(value)
                    );
                });
                setResults(results);
            });
    };

    const handlechange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="mb-3 xl:w-96">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded-l border border-solid border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out focus:z-[3] focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Buscar por titulo, autor o palabra clave"
                    aria-label="Buscar por titulo, autor o palabra clave"
                    aria-describedby="button-addon2"
                    value={input}
                    onChange={(e) => handlechange(e.target.value)}
                />

                {/* Icono de búsqueda dentro de un contenedor redondeado */}
                <span
                    className="input-group-text flex items-center justify-center bg-orange-500 rounded-r px-3 py-2 text-white cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out"
                    id="basic-addon2"
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
                </span>
            </div>

            <div className="py-1">Filtrar por:</div>
            <div className="flex space-x-4">
                {botonColores.map((isAlternateColor, indice) => (
                    <button
                        key={indice}
                        onClick={() => handleButtonClick(indice)}
                        className={`px-4 py-2 font-semibold text-white rounded ${
                            isAlternateColor ? "bg-green-500" : "bg-[#0B6477]"
                        }`}
                    >
                        {nombresBotones[indice]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Search;
