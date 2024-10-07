import React, { useState } from 'react';

const ResizableTextBox = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => Math.min(prevFontSize + 2, 36));
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 2, 12));
  };

  return (
    <div>
      {/* Caja de texto con tamaño de fuente dinámico */}
      <div
        className="bg-white p-4 rounded shadow"
        style={{ fontSize: `${fontSize}px`, height: '300px', overflowY: 'auto' }}
      >
        {children}
      </div>

      {/* Botones para ajustar el tamaño de fuente */}
      <div className="mt-4 flex justify-between items-center">
        <button className="text-2xl font-bold" onClick={increaseFontSize}>
          A+
        </button>
        <button className="text-2xl font-bold" onClick={decreaseFontSize}>
          A-
        </button>
      </div>
    </div>
  );
};

export default ResizableTextBox;
