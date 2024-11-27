import React from 'react';
import { useNavigate } from 'react-router-dom';

const SmallCard = ({ id, coverUrl, title, author }) => {
    const navigate = useNavigate()
    const handleCardClick = () => {
        navigate(`/preview/${id}`);
    };
  return (
    <div className="rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"onClick={handleCardClick}>
        
      {/* Imagen de portada */}
      <div className="w-full h-40 flex items-center justify-center overflow-hidden">
        <img 
          src={coverUrl} 
          alt={title} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Contenido del card */}
      <div className="p-4">
        <h3 className="text-base font-medium truncate">{title}</h3>
        <p className="text-xs truncate">{author}</p>
      </div>
    </div>
  );
};

export default SmallCard;
