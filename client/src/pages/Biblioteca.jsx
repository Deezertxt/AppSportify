import React, { useState, useEffect } from "react";
import { getAudiobooks } from "../api/api";

function Biblioteca() {
    const [audiobooks, setAudiobooks] = useState([]); // Estado para almacenar los audiolibros

    // Cargar los audiolibros cuando el componente se monta
    useEffect(() => {
        const fetchAudiobooks = async () => {
            try {
                const response = await getAudiobooks(); // Llamada a la API
                if (Array.isArray(response.data)) { // Acceder a 'data', que contiene el array
                    setAudiobooks(response.data); // Asignar los audiolibros
                } else {
                    console.error("La respuesta no es un array:", response.data);
                    setAudiobooks([]); // Asignar un array vacío si la respuesta no es válida
                }
            } catch (error) {
                console.error("Error fetching audiobooks:", error);
                setAudiobooks([]); // En caso de error, asegurar un array vacío
            }
        };

        fetchAudiobooks();
    }, []);

    return (
        <>
            <div className="py-10">
                <form className="max-w-2xl mx-auto">
                    <label htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Buscar futbol, basquet..." required />
                        <button type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-[#6177A6] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Buscar
                        </button>
                    </div>
                </form>

                <div className="max-w-4xl mx-auto mt-8">
                    {Array.isArray(audiobooks) && audiobooks.length > 0 ? (
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Título</th>
                                    <th className="px-4 py-2">Autor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {audiobooks.map((audiobook) => (
                                    <tr key={audiobook.id} className="border-b">
                                        <td className="px-4 py-2">{audiobook.id}</td>
                                        <td className="px-4 py-2">{audiobook.title}</td>
                                        <td className="px-4 py-2">{audiobook.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">No se encontraron audiolibros.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Biblioteca;
