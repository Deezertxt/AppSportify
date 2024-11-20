import React from 'react';

const SmallCard = ({ imageUrl, title, author }) => {
  return (
    <div className="w-24 h-36 bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0">
      <div className="w-full h-24 flex items-center justify-center bg-white">
        <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="p-2">
        <h3 className="text-xs font-semibold text-white truncate">{title}</h3>
        <p className="text-[10px] text-gray-400 truncate">{author}</p>
      </div>
    </div>
  );
};

export default SmallCard;
