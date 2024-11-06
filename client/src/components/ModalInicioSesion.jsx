import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { GoXCircleFill } from "react-icons/go";


const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [errorEmail, setErrorEmail] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleBlur = () => {
    const emailRegex = /^[^\s@!#$%^&*()=+{}[\]:'";><.,?\/|\\]+@[^\s@]+\.[^\s@]+$/;
    setErrorEmail(email && !emailRegex.test(email));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Limpia el error previo
    setErrorEmail(false);

    // Validación de email y contraseña
    if (!email || !password) {
      setError("El email y la contraseña son obligatorios");
      setIsLoading(false);
      return;
    }

    // Validación de formato de email personalizada
    const emailRegex = /^[^\s@!#$%^&*()=+{}[\]:'";><.,?\/|\\]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail(true);
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/libros"); // Redirige si el inicio de sesión fue exitoso
      closeModal(); // Cierra el modal
    } catch (error) {
      setError("Error al iniciar sesión"); // Muestra el mensaje de error
      // setError("Error al iniciar sesión: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/libros");
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button 
          type="button" 
          onClick={closeModal} 
          className="absolute top-2 right-2 text-gray-500 m-4">
          <GoXCircleFill className="text-white"/>
        </button>

        <div className="flex flex-col items-center">
          <img src="./logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
        </div>

        <h2 className="text-2xl font-bold text-white text-left mb-6">Inicio Sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Correo electrónico</label>
          <input
            type="text"
            name="email"
            spellcheck="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            onBlur={handleBlur}
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
          />
          { errorEmail && (
            <p className="text-red-500 text-sm mt-1">Mmm... eso no parece una dirección de correo.</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded-md mb-4" spellcheck="false" disabled={isLoading}>
          {isLoading ? "Iniciando..." : "Iniciar Sesión"}
        </button>

        <p className="text-white text-center mb-4">
          ¿Aún no estás en Sportify?{" "}
          <button 
            className="font-bold bg-transparent" 
            onClick={(e) => { e.preventDefault(); openRegister(); }}>
            Regístrate
          </button>
        </p>

        <div className="flex items-center mb-4">
          <hr className="w-full border-white" />
          <span className="px-3 text-white">O</span>
          <hr className="w-full border-white" />
        </div>

        <button 
          onClick={handleGoogleSignin} 
          className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center">
          <img src="google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
};

export default ModalInicioSesion;