import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FiXCircle } from "react-icons/fi";

const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailHint, setEmailHint] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(value)) {
      const missing = value.includes("@") ? ".com o .net" : " @dominio.com";
      setEmailHint(`El correo debe tener el formato example${missing}`);
    } else {
      setEmailHint("");
    }
  };

  const handleForgotPassword = () => {
    navigate("/verificar");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (!email || !password) {
      setError("El email y la contraseña son obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/libros");
      closeModal();
    } catch (error) {
      console.log(error.code);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Credenciales inválidas");
      } else if (error.code === "auth/too-many-requests") {
        setError("Por favor intente más tarde");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/libros");
      closeModal();
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  const isButtonDisabled = !email || !password || isLoading || emailHint;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 m-4"
        >
          <FiXCircle className="text-white" />
        </button>

        <div className="flex flex-col items-center">
          <img src="./logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
        </div>

        <h2 className="text-2xl font-bold text-white text-left mb-6">Inicio Sesión</h2>

        {error && <p className="text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
        {successMessage && <p className="text-green-500 bg-green-100 p-2 rounded-md">{successMessage}</p>}

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Correo electrónico</label>
          <input
            type="text"
            name="email"
            spellcheck="false"
            value={email}
            onChange={handleEmailChange}
            placeholder="Correo electrónico"
            className={`w-full p-2 border-b-2 bg-transparent focus:outline-none text-white ${
              error && "border-red-500"
            }`}
            required
          />
          {emailHint && <p className="text-red-500 text-sm">{emailHint}</p>}
        </div>

        <div className="mb-4 relative">
          <label className="block text-white font-semibold mb-1">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={`w-full p-2 border-b-2 bg-transparent focus:outline-none text-white ${
              error && "border-red-500"
            }`}
          />
          <button
            className="absolute right-2 top-2 p-2"
            onClick={(e) => {
              e.preventDefault();
              togglePasswordVisibility();
            }}
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
        </div>

        <button
          type="submit"
          className={`w-full p-3 rounded-md mb-4 ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          disabled={isButtonDisabled}
        >
          {isLoading ? "Iniciando..." : "Iniciar Sesión"}
        </button>

        <div className="text-center mb-4">
          <button
            href="#!"
            className="font-bold text-sm text-white bg-transparent"
            onClick={handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <p className="text-white text-center mb-4">
          ¿Aún no estás en Sportify?{" "}
          <button
            className="font-bold bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              openRegister();
            }}
          >
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
          className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center"
        >
          <img src="google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
};
export default ModalInicioSesion;