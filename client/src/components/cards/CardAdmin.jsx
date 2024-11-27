import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { Link } from 'react-router-dom';

function CardAdmin({ id, title, author, description, coverUrl, category, onDelete }) {
    return (
        <div className="card-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center border-b border-gray-300 py-4 hover:bg-gray-400 transition-all duration-300">
            {/* Portada */}
            <div className="cover flex justify-center items-center">
                <img
                    className="h-20 w-20 object-cover rounded-lg"
                    src={coverUrl}
                    alt="audiobook cover"
                />
            </div>

            {/* Título */}
            <div className="title font-semibold text-sm truncate overflow-hidden">{title}</div>

            {/* Autor */}
            <div className="author text-sm truncate overflow-hidden">{author}</div>

            {/* Descripción */}
            <div className="description text-sm truncate overflow-hidden">{description}</div>

            {/* Categoría */}
            <div className="category text-sm truncate overflow-hidden">{category}</div>

            {/* Acción (Botones de editar y eliminar) */}
            <div className="flex justify-center items-center space-x-4">
                {/* Botón de editar */}
                <Link to={`/actualizar/${id}`}>
                    <button className="text-gray-500 hover:text-gray-700">
                        <BsFillPencilFill />
                    </button>
                </Link>
                
                {/* Botón de eliminar */}
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}

export default CardAdmin;
