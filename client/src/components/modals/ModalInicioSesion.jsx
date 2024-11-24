import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FiXCircle } from "react-icons/fi";
import { FiMail } from "react-icons/fi";

const ModalInicioSesion = ({ closeModal, openRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailHint, setEmailHint] = useState("");
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

    if (!email || !password) {
      setError("El email y la contraseña son obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/inicio");
      closeModal();
    } catch (error) {
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
      navigate("/inicio");
      closeModal();
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  const isButtonDisabled = !email || !password || isLoading || emailHint;

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-r from-[#023047] to-[#1b6c92] text-white p-8 rounded-lg shadow-lg">
      {/* Botón para cerrar el modal */}
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-white"
      >
        <FiXCircle className="text-2xl" />
      </button>

      <div className="flex flex-col items-center">
        <img src="./logoS.svg" alt="Sportify logo" className="w-28 mb-4" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Inicio Sesión</h2>

      {/* Mensajes de error o éxito */}
      {error && (
        <p className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-md mb-4">
          {error}
        </p>
      )}



      {/* Campo de correo electrónico */}
      <div className="relative mb-6">
        <label className="block text-sm font-semibold mb-1">Correo electrónico <span className="text-red-500"> *</span></label>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@gmail.com"
          className="w-full pl-4 pr-4 py-2 bg-transparent border-b-2 border-white focus:border-[#219EBC] outline-none transition"
        />
        <FiMail className="absolute top-2/3 right-3 transform -translate-y-1/2 text-xl text-gray-400 hover:text-gray-500" />
      </div>

      {emailHint && (
        <p className="text-sm text-red-500 mb-2">{emailHint}</p>
      )}

      {/* Campo de contraseña */}
      <div className="relative mb-6">
        <label className="block text-sm font-semibold mb-1">Contraseña <span className="text-red-500"> *</span></label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          className="w-full pl-4 pr-10 py-2 bg-transparent border-b-2 border-white focus:border-[#219EBC] outline-none transition"
        />
        <button
          type="button"
          className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="text-lg"
          />
        </button>
      </div>

      {/* Botón de inicio de sesión */}
      <button
        onClick={handleSubmit}
        className={`w-full py-3 mb-4 rounded-md ${isButtonDisabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-[#219EBC] hover:bg-[#028090] transition transform hover:scale-105"
          }`}
        disabled={isButtonDisabled}
      >
        {isLoading ? "Iniciando..." : "Iniciar Sesión"}
      </button>

      <button
        className="text-sm underline mb-4"
        onClick={handleForgotPassword}
      >
        ¿Olvidaste tu contraseña?
      </button>

      <p className="text-center text-sm mb-4">
        ¿Aún no estás en Sportify?{" "}
        <button
          className="font-bold text-[#219EBC] underline"
          onClick={openRegister}
        >
          Regístrate
        </button>
      </p>

      <div className="flex items-center mb-4">
        <hr className="w-full border-gray-600" />
        <span className="px-3 text-gray-400">O</span>
        <hr className="w-full border-gray-600" />
      </div>

      <button
        onClick={handleGoogleSignin}
        className="w-full bg-blue-600 text-white py-3 rounded-md flex items-center justify-center hover:bg-blue-500 transition"
      >
        <img src="google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default ModalInicioSesion;
