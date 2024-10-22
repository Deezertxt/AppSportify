import React from "react";

function concertir(cadena) {
    return cadena
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function Card({ title, author, description, coverUrl, onClick }) {
    const handleListenClick = (event) => {
        event.stopPropagation(); // Evita que el clic en el botón propague el evento
        onClick(); // Llama a la función onClick que se pasa como prop
    };

    return (
        <div className="card-container p-4 md:w-1/3">
            <div className="card h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg">
                <img 
                    className="card-image lg:h-48 md:h-36 w-full object-cover" 
                    src={coverUrl} 
                    alt="audiobook cover" 
                />
                <div className="card-content p-6">
                    <h1 className="card-title title-font text-lg font-medium text-gray-900 mb-3">{concertir(title)}</h1>
                    <h2 className="card-author tracking-widest text-s title-font font-medium text-gray-400 mb-1">{author}</h2>
                    <p className="card-description leading-relaxed mb-3">{description}</p>
                    <div className="card-footer flex justify-end mt-4">
                        <button 
                            className="card-button bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300" // Color más suave
                            onClick={handleListenClick} // Asocia el clic al botón
                        >
                            Escuchar Ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
