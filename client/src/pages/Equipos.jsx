import React from 'react';
import Team from "../components/Team";

function Equipos() {
    const equipos = Array(30).fill(null);
    const elementos = []; 

    for (let i = 0; i < equipos.length; i++) {
        if (i % 6 === 0) {
            elementos.push(<p className="text-center my-4 text-[60px] font-bold pt-5">División</p>);
        }
        
        elementos.push(
            <div  className={`flex justify-center my-2 p-8 rounded`}>
                <Team />
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            {elementos} 
        </div>
    );
}

export default Equipos;