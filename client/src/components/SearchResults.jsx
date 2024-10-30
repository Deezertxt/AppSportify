import React, { useState, useEffect } from "react";
import Card from "../components/Card";

import { SearchOptions } from "./SearchOptions";
import { useLocation, useNavigate } from "react-router-dom";

//resultados de busqueda al darle a la lupa
export const SearchResults = () => {
    const [audiobooks, setAudiobooks] = useState([]);
    const location = useLocation();
    const entrada = location.state?.input || "";
    const navigate = useNavigate();

    useEffect(() => {
        // Llama a la API y filtra resultados
        const fetchAudiobooks = async () => {
            if (entrada === "") {
                //si no hay nada en la entrada
                try {
                    fetch("http://localhost:3000/api/audiobook/get/")
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(
                                "----------------------------------------------"
                            );
                            //console.log(typeof json);
                            console.log("AAAAAAAAAAAA");
                            console.log("si audiobooks esta vacio:" + json);
                            console.log(entrada.toLowerCase());
                            console.log("ENCONTRADOS:    " + json);
                            setAudiobooks(json);
                            console.log(
                                "------------------------------------------"
                            );
                        });
                } catch (error) {
                    console.error("Error al obtener audiolibros:", error);
                }
            } else {
                try {
                    fetch("http://localhost:3000/api/audiobook/get/")
                        .then((response) => response.json())
                        .then((json) => {
                            console.log(
                                "----------------------------------------------"
                            );
                            //console.log(typeof json);
                            console.log(json);
                            const results = json.filter((audiobook) => {
                                return (
                                    entrada &&
                                    audiobook &&
                                    audiobook.title &&
                                    audiobook.title
                                        .toLowerCase()
                                        .includes(entrada.toLowerCase())
                                );
                            });
                            console.log(entrada.toLowerCase());
                            console.log("ENCONTRADOS:    " + results);
                            setAudiobooks(results);
                            console.log(
                                "------------------------------------------"
                            );
                        });
                } catch (error) {
                    console.error("Error al obtener audiolibros:", error);
                }
            }
        };

        fetchAudiobooks();
    }, [entrada]);

    const handleCardClick = (id) => {
        navigate(`/reproductor/${id}`); // Redirigir al reproductor del audiolibro
    };
    return (
        <div>
            <div className="px-20">
                {/* <div className=''>Filtrar por: </div> */}
                <SearchOptions />
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                {Array.isArray(audiobooks) && audiobooks.length > 0 ? (
                    <div className="flex flex-wrap -m-4">
                        {audiobooks.map((audiobook) => (
                            <Card
                                key={audiobook.id}
                                title={audiobook.title}
                                author={audiobook.author}
                                coverUrl={audiobook.coverUrl} // Suponiendo que tienes una propiedad 'coverImage' para la URL de la portada
                                onClick={() => handleCardClick(audiobook.id)} // Pasar la función onClick
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[30px] font-bold py-5">
                        No se encontraron audiolibros.
                    </p>
                )}
            </div>
        </div>
    );
};
