import React, { useState } from "react";

export const SearchOptions = () => {
    const [botonColores, setBotonColores] = useState([
        false,
        false,
        false,
        false,
    ]);
    const nombresBotones = ["Todos", "Titulo", "Autor", "Categoria"];

    //colores botones
    const handleButtonClick = (i) => {
        const nuevoColor = [...botonColores];
        nuevoColor[i] = !nuevoColor[i];
        setBotonColores(nuevoColor);
    };
    return (
        <div className="flex space-x-4">
            <div>Filtrar por: </div>
            {botonColores.map((isAlternateColor, indice) => (
                <button
                    key={indice}
                    onClick={() => handleButtonClick(indice)}
                    className={`px-4 py-2 font-semibold text-white rounded-full ${
                        isAlternateColor ? "bg-green-500" : "bg-[#0B6477]"
                    }`}
                >
                    {nombresBotones[indice]}
                </button>
            ))}
        </div>
    );
};
