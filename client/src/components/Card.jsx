import React from "react";

function Card({ title, author,description, coverUrl, onClick }) {
    return (
        <div className="p-4 md:w-1/3" onClick ={onClick}>
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={coverUrl} alt="audiobook cover" />
                <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                    <h2 className="tracking-widest text-s title-font font-medium text-gray-400 mb-1">{author}</h2>
                    <p className="leading-relaxed mb-3">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;