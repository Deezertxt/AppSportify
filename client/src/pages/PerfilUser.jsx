import React, { useState } from "react";
import Slider from "react-slick"; // Importa el Slider de react-slick
import Card from "./Card";


const PerfilUser = () => {
  const [activeTab, setActiveTab] = useState("recomendado");

  // Configuración del carrusel
  const settings = {
    dots: true, // Muestra los puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 5, // Muestra 5 tarjetas a la vez
    slidesToScroll: 1, // Desplaza una tarjeta a la vez
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-col items-center p-4">
        <img
          className="w-20 h-20 rounded-full shadow-md sm:w-24 sm:h-24"
          src="User.png"
          alt="User Avatar"
        />
        <h2 className="mt-3 text-lg font-bold text-gray-800 sm:text-xl">
          Nombre completo
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">UserName --</p>
        <p className="mt-2 text-center text-gray-600 text-sm sm:text-base">
          Descripción Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <div className="border-t border-gray-200 py-3 text-center">
        <p className="text-sm text-gray-600 sm:text-base">
          <span className="font-semibold">1</span> terminados ·{" "}
          <span className="font-semibold">2</span> guardados
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-center bg-white text-gray-800">
          <button
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "recomendado"
                ? "border-blue-500 font-bold text-blue-500"
                : "border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
            onClick={() => setActiveTab("recomendado")}
          >
            Recomendado
          </button>
          <button
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "guardado"
                ? "border-blue-500 font-bold text-blue-500"
                : "border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
            onClick={() => setActiveTab("guardado")}
          >
            Guardado
          </button>
          <button
            className={`flex-1 py-2 text-center border-b-2 ${
              activeTab === "terminados"
                ? "border-blue-500 font-bold text-blue-500"
                : "border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
            onClick={() => setActiveTab("terminados")}
          >
            Terminados
          </button>
        </div>

        <div className="p-3">
          {activeTab === "recomendado" && (
            <div>
              <Slider {...settings}>
                {guardados.map((card, index) => (
                  <Card
                    key={index}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                  />
                ))}
              </Slider>
            </div>
          )}
          {activeTab === "guardado" && (
            <div>
              <Slider {...settings}>
                {guardados.map((card, index) => (
                  <Card
                    key={index}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                  />
                ))}
              </Slider>
            </div>
          )}
          {activeTab === "terminados" && (
            <div>
              <Slider {...settings}>
                {guardados.map((card, index) => (
                  <Card
                    key={index}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                  />
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex justify-between items-center bg-gray-100 rounded-md p-2">
          <p className="text-gray-700 font-medium">AppSportify</p>
          <span className="text-sm text-gray-500">Público</span>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
