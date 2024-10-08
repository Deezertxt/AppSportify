import React from 'react';
import Team from "../components/Team.jsx";

function Equipos() {
    const equipos = Array(30).fill(null);
    const elementos = []; 

    for (let i = 0; i < equipos.length; i++) {
        if (i % 6 === 0) {
            elementos.push(<p className="text-center my-8 text-2xl md:text-4xl lg:text-5xl font-bold pt-5">División</p>);
        }
        
        elementos.push(
            <div className="flex justify-center my-4 p-6 md:p-8 lg:p-10 rounded">
                <Team />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            {elementos} 
        </div>
    );
}

export default Equipos;