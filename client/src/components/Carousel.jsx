import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const getClassName = (index) => {
    if (index === currentIndex) {
      return "w-[70%] sm:w-[60%] scale-110 opacity-100 z-10"; 
    } else if (index === currentIndex - 1 || index === currentIndex + 1) {
      return "w-[40%] sm:w-[30%] scale-95 opacity-60";
    }
    return "hidden"; 
  };

  return (
    <div className="carousel-container flex justify-center items-center relative w-full max-w-[100%] px-2 sm:px-4">
      <button
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 z-20 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75 transition ${
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {"<"}
      </button>

      
      <div className="carousel flex justify-center items-center overflow-hidden w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item relative transition-all duration-500 transform cursor-pointer ${getClassName(
              index
            )}`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className={`w-full ${
                index === currentIndex ? "h-[300px] sm:h-[400px] object-contain" : "h-[200px] sm:h-[300px] object-cover"
              } rounded-lg`}
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
        className={`absolute right-0 z-20 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full hover:bg-opacity-75 transition ${
          currentIndex === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;