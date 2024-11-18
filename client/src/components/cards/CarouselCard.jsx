import React from "react";
import Slider from "react-slick";
import Card from "./Card"; // Asegúrate de tener el componente Card disponible
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Íconos para las flechas

// Flecha personalizada para navegación izquierda
const PrevArrow = ({ currentSlide, ...props }) => (
    <button
      {...props}
      className={`absolute -left-5 top-1/2 transform -translate-y-1/2 text-2xl transition-colors duration-200
        ${currentSlide === 0 ? "text-gray-300 cursor-default" : "text-gray-500 hover:text-blue-500"}`}
      disabled={currentSlide === 0}
      aria-label="Anterior"
    >
      <FiChevronLeft />
    </button>
  );

// Flecha personalizada para navegación derecha
const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={`absolute -right-3.5 top-1/2 transform -translate-y-1/2 text-2xl 
      ${currentSlide === slideCount - 1 ? "text-gray-300 cursor-default" : "text-gray-500 hover:text-blue-500"}`}
    disabled={currentSlide === slideCount - 1}
    aria-label="Siguiente"
  >
    <FiChevronRight />
  </button>
);

const CarouselCard = ({ audiobooks }) => {
  const settings = {
    infinite: false, // Deshabilitamos el bucle infinito para que las flechas deshabilitadas tengan sentido
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Flecha personalizada izquierda
    nextArrow: <NextArrow />, // Flecha personalizada derecha
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container relative">
      <h2 className="carousel-title"></h2>
      <Slider {...settings}>
      {audiobooks.map((audiobook) => (
        <div key={audiobook.id} className="carousel-item">
          <Card
            id={audiobook.id}
            title={audiobook.title}
            author={audiobook.author}
            coverUrl={audiobook.coverUrl}
            duration={audiobook.duration}
            averagerating={audiobook.averageRating}
          />
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default CarouselCard;
