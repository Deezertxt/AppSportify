import React from 'react';
import Team from "../components/Team";

function Equipos() {
    return (
        <div className="flex my-10  even:flex-col-reverse justify-center items-center gap-8">
            <Team/>
            <Team/>
            <Team/>
            <Team/>
            <Team/>
        </div>
    );
}

export default Equipos;