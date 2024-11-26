import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Card from "./Card";
import SkeletonCard from "../skeletons/SkeletonCard";

const CarouselCard = ({ audiobooks, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5); // Inicializar con 5 para pantallas grandes

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // En pantallas pequeñas (menos de 640px), mostrar 1 skeleton
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // En pantallas medianas (menos de 1024px), mostrar 2 skeletons
      } else {
        setVisibleItems(5); // En pantallas grandes, mostrar 5 skeletons
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Limitar la cantidad de audiolibros a 10, pero asegurarse de que no sobrepase
  const limitedAudiobooks = audiobooks.slice(0, 10);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Mover de uno en uno
    }
  };

  const handleNext = () => {
    if (currentIndex < limitedAudiobooks.length - visibleItems) {
      setCurrentIndex(currentIndex + 1); // Mover de uno en uno
    }
  };

  const isLastIndex = currentIndex >= limitedAudiobooks.length - visibleItems;
  const isFirstIndex = currentIndex === 0;

  return (
    <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Flecha Anterior */}
      <button
        onClick={handlePrev}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-3xl z-10 transition-all duration-300 ${isFirstIndex ? "text-gray-400" : "text-gray-500 hover:text-blue-500"
          }`}
        aria-label="Anterior"
        disabled={isFirstIndex}
      >
        <FiChevronLeft />
      </button>

      {/* Carrusel de Audiolibros */}
      <div className="flex overflow-hidden">
        <div
          className="flex transition-all duration-500"
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`, // Siempre mueve de 1 en 1
          }}
        >
          {loading
            ? [...Array(visibleItems)].map((_, index) => (
              <div key={index} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 px-2 transition-transform duration-500">
                <SkeletonCard />
              </div>
            ))
            : limitedAudiobooks.map((audiobook) => (
              <div
                key={audiobook.id}
                className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/5 px-2 transition-transform duration-500"
              >
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-[200px] sm:max-w-[220px]">
                    <Card
                      id={audiobook.id}
                      title={audiobook.title}
                      author={audiobook.author}
                      coverUrl={audiobook.coverUrl}
                      duration={audiobook.duration}
                      averagerating={audiobook.averageRating}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Flecha Siguiente */}
      <button
        onClick={handleNext}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 text-3xl z-10 transition-all duration-300 ${isLastIndex ? "text-gray-400" : "text-gray-500 hover:text-blue-500"
          }`}
        aria-label="Siguiente"
        disabled={isLastIndex}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default CarouselCard;
