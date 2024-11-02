import { useState } from "react";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleLogin} from '@react-oauth/google';
import { GoXCircleFill } from "react-icons/go";


const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
=======
import supabase from "../utils/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {UserAuth}  from "../context/AuthContextProvider";

const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signInWithGoogle} = UserAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Limpiar errores previos

    // Llama a Supabase para autenticar
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setError("Error al iniciar sesión: " + error.message); // Muestra el mensaje de error
    } else {
      navigate("/"); // Redirige si el inicio de sesión fue exitoso
      closeModal(); // Cierra el modal
    }
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
  };
  

  return (
    <div>
<<<<<<< HEAD
      <form>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 m-4"
        >
          <GoXCircleFill className="text-white"/>
        </button>

        <div className="flex flex-col items-center">
          <img src="logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
=======
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 "
        >
          X
        </button>

        <div className="flex flex-col items-center">
          <img src="./logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
        </div>

        <h2 className="text-2xl font-bold text-white text-left mb-6">Inicio Sesión</h2>

<<<<<<< HEAD
        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Correo electrónico <span className="text-red-500">*</span></label>
          
=======
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Correo electrónico</label>
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>

        <div className="mb-4">
<<<<<<< HEAD
          <label className="block text-white font-semibold mb-1">Contraseña <span className="text-red-500">*</span></label>
          <input
            type={showPassword ? "text" : "password"}
=======
          <label className="block text-white font-semibold mb-1">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
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
<<<<<<< HEAD
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="text text-default-400 pointer-events-none text-white" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="text text-default-400 pointer-events-none text-white" />
            )}
          </button>
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-md mb-4">
          Iniciar Sesión
=======
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-default-400 text-white" />
          </button>
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-md mb-4" disabled={isLoading}>
          {isLoading ? "Iniciando..." : "Iniciar Sesión"}
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
        </button>

        <p className="text-white text-center mb-4">
          ¿Aun no estas en Sportify?{" "}
          <button
            className="font-bold bg-transparent"
            onClick={(e) => {
              e.preventDefault();
<<<<<<< HEAD
              openRegister(); // Llama a openRegister para cambiar al formulario de registro
=======
              openRegister(); // Cambia al formulario de registro
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
            }}
          >
            Registrate
          </button>
        </p>

        <div className="flex items-center mb-4">
          <hr className="w-full border-white" />
          <span className="px-3 text-white">O</span>
          <hr className="w-full border-white" />
        </div>

<<<<<<< HEAD
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
=======
        <button onClick={signInWithGoogle} className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center">
      <img src="google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
      Iniciar sesión con Google
    </button>
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default ModalInicioSesion;
=======
export default ModalInicioSesion;
>>>>>>> 56c13f7efbb29e7713e25467afee086194ae803b
