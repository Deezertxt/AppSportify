import React from "react";

const PerfilUser = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden sm:max-w-lg md:max-w-xl lg:max-w-2xl">
     
      <div className="flex flex-col items-center p-6">
       
        <img
          className="w-24 h-24 rounded-full shadow-md sm:w-28 sm:h-28 lg:w-32 lg:h-32"
          src="User.png"
          alt="User Avatar"
        />
      
        <h2 className="mt-4 text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl">
          Nombre completo
        </h2>
     
        <p className="text-gray-500 text-sm text-center sm:text-base">
          UserName --
        </p>
       
        <p className="mt-2 text-center text-gray-600 text-sm sm:text-base lg:text-lg">
          Descripción Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Non molestias quis repudiandae amet perferendis, cupiditate optio
          ducimus asperiores suscipit odio eius. Totam placeat facilis
          perferendis, vero alias maiores quas ut.
        </p>
      </div>

    
      <div className="border-t border-gray-200">
        <h3 className="p-4 text-lg font-semibold text-gray-800 sm:text-xl">
          Favoritos
        </h3>
        <div className="flex justify-center gap-4 pb-4">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            src="https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Faaaaddddddddddddd.jpg?alt=media&token=66fe8acc-013d-473f-93a7-88fb1d200f87"

            alt="Achievement 1"
          />
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            src="https://firebasestorage.googleapis.com/v0/b/sportify-198e3.appspot.com/o/uploads%2Fcovers%2Fholis.jpg?alt=media&token=fec38952-f2eb-416b-9cc6-fd3de2375d64"

            alt="Achievement 2"
          />
        </div>
      </div>

 
      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-sm text-gray-600 sm:text-base">
          <span className="font-semibold">1</span> terminados ·{" "}
          <span className="font-semibold">2</span> guardados
        </p>
       
      </div>


      <div className="border-t border-gray-200">
        <h3 className="p-4 text-lg font-semibold text-gray-800 sm:text-xl">
          Guardado
        </h3>
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center bg-gray-100 rounded-md p-2 sm:p-4">
            <p className="text-gray-700 font-medium sm:text-lg">
              AppSportify
            </p>
            <span className="text-sm text-gray-500 sm:text-base">
              Público
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUser;
