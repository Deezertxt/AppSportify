import { useState } from "react";
import ModalInicioSesion from "../components/modals/ModalInicioSesion"; // Ruta al componente del formulario de inicio de sesión

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#023047] to-[#8ECAE6]">
      {/* Contenedor del formulario de inicio de sesión */}
      <div className="w-full max-w-md p-6 rounded-md shadow-lg relative">
        <div className="absolute inset-0  z-40" />
        <div className="relative z-50">
    
          {/* Aquí va el componente de inicio de sesión */}
          <ModalInicioSesion />
        </div>
      </div>
    </div>
  );
};

export default Login;
