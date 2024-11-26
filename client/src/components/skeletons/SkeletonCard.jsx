import React from "react";

const SkeletonCard = () => {
  return (
    <div className="group relative w-full bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Placeholder de la imagen de portada */}
      <div className="w-full h-96 bg-gray-300 dark:bg-gray-700"></div>

      {/* Placeholder de la capa de información */}
      <div className="absolute inset-0 bg-slate-900 bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4 space-y-2">
        <div className="h-5 bg-gray-400 dark:bg-gray-600 rounded w-4/5"></div>
        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/5"></div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <div className="h-4 w-4 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
