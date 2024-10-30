import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin} from '@react-oauth/google';

const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  return (
    <div>
      <form>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 "
        >
          X
        </button>

        <div className="flex flex-col items-center">
          <img src="logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
        </div>

        <h2 className="text-2xl font-bold text-white text-left mb-6">Inicio Sesión</h2>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full text-white focus:outline-none border-b-2 bg-transparent p-2"
          />
          <button
            className="absolute right-6 p-2"
            onClick={(e) => {
              e.preventDefault();
              togglePasswordVisibility();
            }}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="text text-default-400 pointer-events-none text-white" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="text text-default-400 pointer-events-none text-white" />
            )}
          </button>
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-md mb-4">
          Iniciar Sesión
        </button>

        <p className="text-white text-center mb-4">
          ¿Aun no estas en Sportify?{" "}
          <button
            className="font-bold bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              openRegister(); // Llama a openRegister para cambiar al formulario de registro
            }}
          >
            Registrate
          </button>
        </p>

        {/* Separador */}
        <div className="flex items-center mb-4">
          <hr className="w-full border-white" />
          <span className="px-3 text-white">O</span>
          <hr className="w-full border-white" />
        </div>

        {/* Botón de Google */}

        <button 
        onClick={GoogleLogin}
        className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center">
<img
  src="google.svg" 
  alt="Google icon"
  className="w-5 h-5 mr-2"
/>
  Iniciar sesión con Google
</button>

        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
            onError={() => {
            console.log('Login Failed');
          }}
        />;
      </form>
    </div>
  );
};

export default ModalInicioSesion;