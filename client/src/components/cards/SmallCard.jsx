import React from 'react';

const SmallCard = ({ coverUrl, title, author }) => {
  return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
              <img src={coverUrl} alt={title} className="h-full object-contain" />
          </div>
          <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{title}</h3>
              <p className="text-xs text-gray-500 truncate">{author}</p>
          </div>
      </div>
  );
};

export default SmallCard;
