import React from "react";

const AudiobookCover = ({ coverUrl }) => {
    return (
        <div className="w-20 h-14 flex-shrink-0">
            <img 
                src={coverUrl} 
                alt="Audiobook Cover" 
                className="w-full h-full object-cover rounded-lg shadow-lg" 
            />
        </div>
    );
};

export default AudiobookCover;
