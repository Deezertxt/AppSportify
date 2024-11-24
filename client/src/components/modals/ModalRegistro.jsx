import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { FiXCircle, FiMail, FiUser } from "react-icons/fi";
import { registerUser } from "../../api/api"; // Asegúrate de importar la función registerUser

const ModalRegistro = ({ closeModal, openLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailHint, setEmailHint] = useState("");
  const navigate = useNavigate();
  const { signUp, loginWithGoogle } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

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

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPasswordError("");

    if (!email || !password || !confirmPassword || !name) {
      setError("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un carácter especial"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Realizamos el registro del usuario en Firebase
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Registra los datos del usuario en la base de datos
      await registerUser({
        firebaseUserId: user.uid,
        username: name,
        email: email,
      });

      // Si el registro es exitoso, redirige al usuario a la página de libros
      navigate("/inicio");
      closeModal();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo electrónico ya está registrado");
      } else {
        setError("Error al registrar usuario: " + error.message);
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
      setError("Error al registrarse con Google: " + error.message);
    }
  };

  const isButtonDisabled = !email || !password || !confirmPassword || !name || isLoading || emailHint || passwordError;

  return (
    <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto bg-gradient-to-r from-[#023047] to-[#1b6c92] text-white p-6 rounded-lg shadow-lg h-auto">
      {/* Botón para cerrar el modal */}
      <button
        type="button"
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-white"
      >
        <FiXCircle className="text-2xl" />
      </button>

      <div className="flex flex-col items-center mb-4">
        <img src="./logoS.svg" alt="Sportify logo" className="w-20 mb-4" />
      </div>

      <h2 className="text-2xl font-bold text-center mb-4">Regístrate</h2>

      {/* Mensajes de error o éxito */}
      {error && (
        <p className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-md mb-4">
          {error}
        </p>
      )}
      {passwordError && (
        <p className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-md mb-4">
          {passwordError}
        </p>
      )}

      {/* Campo de nombre */}
      <div className="relative mb-4">
        <label className="block text-sm font-semibold mb-1">Username <span className="text-red-500"> *</span></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
          className="w-full pl-4 pr-4 py-2 bg-transparent border-b-2 border-white focus:border-[#219EBC] outline-none transition"
        />
        <FiUser className="absolute top-2/3 right-3 transform -translate-y-1/2 text-xl text-gray-400 hover:text-gray-500" />
      </div>

      {/* Campo de correo electrónico */}
      <div className="relative mb-4">
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
      <div className="relative mb-4">
        <label className="block text-sm font-semibold mb-1">Contraseña <span className="text-red-500"> *</span></label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          maxLength={12}
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

      {/* Campo de confirmación de contraseña */}
      <div className="relative mb-4">
        <label className="block text-sm font-semibold mb-1">Confirmar Contraseña <span className="text-red-500"> *</span></label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="******"
          maxLength={12}
          className="w-full pl-4 pr-10 py-2 bg-transparent border-b-2 border-white focus:border-[#219EBC] outline-none transition"
        />
        <button
          type="button"
          className="absolute top-2/3 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-500"
          onClick={toggleConfirmPasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEye : faEyeSlash}
            className="text-lg"
          />
        </button>
      </div>

      {/* Botón de registro */}
      <button
        onClick={handleSubmit}
        className={`w-full py-3 mb-4 rounded-md ${isButtonDisabled
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-[#219EBC] hover:bg-[#028090] transition transform hover:scale-105"
          }`}
        disabled={isButtonDisabled}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>

      <p className="text-center text-sm mb-4">
        ¿Ya tienes cuenta?{" "}
        <button
          className="font-bold text-[#219EBC] underline"
          onClick={openLogin}
        >
          Inicia sesión
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
        Registrarse con Google
      </button>
    </div>
  );
};

export default ModalRegistro;
