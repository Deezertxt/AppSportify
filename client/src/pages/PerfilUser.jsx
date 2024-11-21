import React, { useState } from "react";
import Slider from "react-slick"; 
import Card from "./Card";
import { BsBookmarkCheckFill  ,BsCheckSquareFill ,BsFillPatchCheckFill  } from "react-icons/bs";

const guardados = [
  
 
 
 
 
   {
    imageUrl:
      "https://storage.googleapis.com/sportify-2/uploads/covers/WhatsApp Image 2024-11-01 at 21.41.20.jpeg",
    title: "Voleibol",
    author: "De altura",
  },
 
  
  
 
 
];

const PerfilUser = () => {
  const [activeTab, setActiveTab] = useState("recomendado");

  // Configuración del carrusel
  const settings = {
  dots: true, // Muestra los puntos de navegación
  infinite: false, // Desactiva el desplazamiento infinito
  speed: 500, // Velocidad de transición
  slidesToShow: Math.min(5, guardados.length), // Muestra el menor valor entre 5 y el número de tarjetas
  slidesToScroll: 1, 
    responsive: [
      {
        breakpoint: 1024,
      settings: {
        slidesToShow: Math.min(3, guardados.length), 
        slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, guardados.length),
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

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center bg-white text-gray-800">
        <button
  className={`flex-1 py-2 text-center border-b-2 ${
    activeTab === "recomendado"
      ? "border-blue-500 font-bold text-blue-500"
      : "border-transparent hover:text-blue-500 hover:border-blue-500"
  } inline-flex items-center justify-center space-x-2 text-lg`}
  onClick={() => setActiveTab("recomendado")}
>
  <BsFillPatchCheckFill className="text-lg" size={24} />
  <span>Recomendado</span>
</button>

<button
  className={`flex-1 py-2 text-center border-b-2 ${
    activeTab === "guardado"
      ? "border-blue-500 font-bold text-blue-500"
      : "border-transparent hover:text-blue-500 hover:border-blue-500"
  } inline-flex items-center justify-center space-x-2 text-lg`}
  onClick={() => setActiveTab("guardado")}
>
  <span className="flex items-center space-x-2">
    <BsBookmarkCheckFill className="text-lg" size={24} />
    <span>Guardado</span>
  </span>
</button>

<button
  className={`flex-1 py-2 text-center border-b-2 ${
    activeTab === "terminados"
      ? "border-blue-500 font-bold text-blue-500"
      : "border-transparent hover:text-blue-500 hover:border-blue-500"
  } inline-flex items-center justify-center space-x-2 text-lg`}
  onClick={() => setActiveTab("terminados")}
>
  <span className="flex items-center space-x-2">
    <BsCheckSquareFill className="text-lg" size={24} />
    <span>Terminados</span>
  </span>
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
