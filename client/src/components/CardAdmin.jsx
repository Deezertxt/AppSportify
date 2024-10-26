import React from "react";

function CardRow({ title, author, description, coverUrl, category, onDelete }) {
    return (
        <div className="card-row grid grid-cols-[auto,auto,auto,auto,auto,auto] items-center border-b border-gray-300 py-4 px-2 hover:bg-gray-100">
            {/* Portada */}
            <div className="cover flex justify-center items-center truncate">
                <img
                    className="h-16 w-16 object-cover rounded"
                    src={coverUrl}
                    alt="audiobook cover"
                />
            </div>

            {/* Título */}
            <div className="title text-gray-900 font-semibold text-sm truncate max-w-full overflow-hidden text-ellipsis">
                <h1 className="text-xs font-bold mb-1">Título</h1>
                {title}
            </div>

            {/* Descripción */}
            <div className="description text-gray-600 text-sm truncate max-w-full overflow-hidden text-ellipsis min-w-0">
                <h1 className="text-xs font-bold mb-1">Descripción</h1>
                {description}
            </div>

            {/* Autor */}
            <div className="author text-gray-600 text-sm truncate max-w-full overflow-hidden text-ellipsis min-w-0">
                <h1 className="text-xs font-bold mb-1">Autor</h1>
                {author}
            </div>

            {/* Categoría */}
            <div className="category text-gray-600 text-sm truncate max-w-full overflow-hidden text-ellipsis min-w-0">
                <h1 className="text-xs font-bold mb-1">Categoría</h1>
                {category}
            </div>

            {/* Eliminar */}
            <div className=" mb-7 justify-center">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700 absolute  ">
                    ✖
                </button>
            </div>
        </div>
    );
}

export default CardRow;
