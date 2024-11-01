import React from "react";

const ChapterText = ({ text, fontSize }) => {
    const [title, ...paragraphs] = text.split("\n").filter(line => line.trim() !== "");

    return (
        <div style={{ fontSize }} className="text-gray-900 p-4 overflow-y-auto h-full">
            {/* Título */}
            <h1 className="text-2xl font-bold mb-4 text-gray-900">{title}</h1>
            
            {/* Contenido en párrafos */}
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed text-gray-800">
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

export default ChapterText;
