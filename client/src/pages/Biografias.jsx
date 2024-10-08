import React from 'react';
import Card from "../components/Card";

function Biografias() {
    // Aquí defines 30 jugadores.
    const jugadores = Array(12).fill(null);
    const elementos = []; 
    
    // Llenar el array de elementos con las tarjetas y divisiones.
    for (let i = 0; i < jugadores.length; i++) {
        // Añadir cada tarjeta de jugador (biografía)
        elementos.push(
            <div key={i} className="flex justify-center p-8">
                <Card />
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {elementos}
            </div>
        </div>
    );
}

export default Biografias;
