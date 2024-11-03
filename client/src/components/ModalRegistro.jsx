import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/authContext";  // Asegúrate de importar la función de inicio de sesión con Google
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

const RegistrationForm = ({ closeModal, openLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { signUp, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateTextInput = (input) => /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()\-:;]*$/.test(input);

  const validatePassword = (password, confirmPassword) => password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");
    const errors = {};

    // Validaciones
    if (!validatePassword(formData.password, formData.confirmPassword)) {
      errors.password = "Las contraseñas no coinciden.";
    }
    if (!validateTextInput(formData.username)) {
      errors.username = "El nombre de usuario contiene caracteres no permitidos.";
    } else if (formData.username.trim() === "") {
      errors.usernameEmpty = "El nombre de usuario no puede estar vacío.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signUp(formData.email, formData.password);
      const user = userCredential.user;
      // Guardar `username` en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
      });
      setSuccessMessage("Registro exitoso!");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error al registrar:", error);
      setFormErrors({ general: error.message || "Error al registrar. Verifique los campos." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {username: user.displayName, email: user.email}, {merge: true});

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
          className="absolute top-2 right-2 text-gray-500"
        >
          X
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src="logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white text-left mb-6">Regístrate</h2>

        {/* Campos de entrada y manejo de errores */}
        {formErrors.general && <p className="text-red-500">{formErrors.general}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">Nombre de usuario<span className="text-red-500"> *</span></label> <input
            type="text"
            name="username"
            maxLength={10}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
          {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">Correo electrónico<span className="text-red-500"> *</span></label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Contraseña<span className="text-red-500"> *</span></label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="******"
            value={formData.password}
            onChange={handleChange}
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

        <div className="mb-4">
          <label className="block text-white font-semibold mb-1">Confirmar contraseña<span className="text-red-500"> *</span></label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="******"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full text-white focus:outline-none border-b-2 bg-transparent p-2"
          />
          <button
            className="absolute right-6 p-2"
            onClick={(e) => {
              e.preventDefault();
              toggleConfirmPasswordVisibility();
            }}
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md mb-4"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>

        {/* Enlace de inicio de sesión */}
        <p className="text-white text-center mb-4">
          ¿Ya tienes una cuenta?{" "}
          <button className="font-bold bg-transparent" onClick={openLogin}>
            Inicia sesión
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
          type="button"
          onClick={handleGoogleSignin}
          className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center"
        >
          <img src="google.svg" alt="Google icon" className="w-5 h-5 mr-2" />
          Registrarse con Google
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
