import React from "react";

function concertir(cadena) {
    return cadena
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function Card({ title, author, description, coverUrl, duration, rating, onClick }) {
    const handleCardClick = () => {
        onClick();
    };

    return (
        <div className="card-container p-4 md:w-1/3">
            <div
                className="card h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105 cursor-pointer"
                onClick={handleCardClick}
            >
                {/* Contenedor de imagen con centrado */}
                <div className="image-container flex justify-center items-center h-60 bg-gray-100">
                    <img
                        className="card-image h-full w-auto object-contain"
                        src={coverUrl}
                        alt="audiobook cover"
                    />
                </div>
                {/* Contenido de la tarjeta */}
                <div className="card-content p-4">
                    <h1 className="card-title text-xl font-bold text-gray-900 mb-2">{concertir(title)}</h1>
                    <h2 className="card-author text-sm font-medium text-gray-500 mb-1">{author}</h2>
                    <p className="card-description text-gray-600 text-sm mb-2">{description}</p>
                    {/* Duración y calificación */}
                    <div className="card-meta flex items-center justify-between mt-2 mb-4">
                        <div className="card-duration flex items-center text-gray-600 text-sm">
                            <span className="inline-block mr-1">🕒</span>
                            <span>{duration}</span>
                        </div>
                        <div className="card-rating flex items-center text-gray-600 text-sm">
                            <span className="inline-block mr-1"></span>
                            <span>{rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
