import React from "react";
import { Link } from 'react-router-dom';

function CardRow({ id, title, author, description, coverUrl, category, onDelete }) {
    return (
        <div className="card-row grid grid-cols-[auto,1.5fr,1fr,1fr,1fr,1fr] items-center border-b border-gray-300 py-4 hover:bg-gray-100 ml-12">
            {/* Portada */}
            <div className="cover flex justify-center items-center">
                <img
                    className="h-16 w-16 object-cover rounded"
                    src={coverUrl}
                    alt="audiobook cover"
                />
            </div>

            {/* Título */}
            <div className="title text-gray-900 font-semibold text-sm max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap ml-24">
       
                {title}
            </div>

            {/* Autor */}
            <div className="author text-gray-600 text-sm max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap ml-13">
              
                {author}
            </div>

            {/* Descripción */}
            <div className="description text-gray-600 text-sm max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap ml-7">
               
                {description}
            </div>

            {/* Categoría */}
            <div className="category text-gray-600 text-sm max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap ml-14">
                
                {category}
            </div>


            <div className="flex items-center  mb-4 ml-14">
                <div className="mb-1 justify-center">
                <Link to={`/Actualizar/${id}`}>
                        <button className="text-red-500 hover:text-red-700 text-white">
                            <img src="lapiz.svg">

                            </img>
                        </button>
                    </Link>
                </div>
                
                <div className="mb-3 pl-6 justify-center">
                    <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                        ✖
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardRow;
