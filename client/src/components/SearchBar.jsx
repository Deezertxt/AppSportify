import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';


function SearchBar({ setResults }) {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const fetchData = (value) => {
        fetch("http://localhost:3000/api/audiobook/get/")
            .then((response) => response.json())
            .then((json) => {
                console.log("----------------------------------------------");
                //console.log(typeof json);
                console.log(json);
                const results = json.filter((audiobook) => {
                    return (
                        value &&
                        audiobook &&
                        audiobook.title &&
                        audiobook.title.toLowerCase().includes(value.toLowerCase())
                    );
                });
                console.log(value.toLowerCase());
                console.log(results);
                setResults(results);
                console.log("------------------------------------------");
            });
    };
    const handlechange = (value) => {
        if (value.length < 100) {
            setInput(value);
            fetchData(value);
        } else {
            alert("menos de 100 caracteres");
        }
    };

    //click en la lupa
    const find = (entrada) => {
        console.log("buscando:   " + entrada); 
        navigate("/buscar", {state: {input}});
        //setInput('') //vacio la barra de busqueda
        setResults([])  //vacio la lista de coincidencias
    }

    return (
        <div className="mb-3 xl:w-96">
            <div className="relative mb-4 flex w-[1000px] flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded-l border border-solid border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-700 placeholder-gray-400 transition duration-200 ease-in-out focus:z-[3] focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Buscar por titulo, autor o categoria"
                    aria-label="Buscar por titulo, autor o categoria"
                    aria-describedby="button-addon2"
                    value={input}
                    onChange={(e) => handlechange(e.target.value)}
                    onKeyDown={(e) => {if(e.key === 'Enter'){find(input)}} }
                />
                {/* Icono de búsqueda dentro de un contenedor redondeado */}
                <div>
                    <span
                        className="h-[42px] input-group-text flex items-center justify-center bg-orange-500 rounded-r px-3 py-2 text-white cursor-pointer hover:bg-orange-600 transition duration-200 ease-in-out"
                        id="basic-addon2"
                        onClick={() => find(input)}
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

            </div>
        </div>
    );
}

export default SearchBar;
