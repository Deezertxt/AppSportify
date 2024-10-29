import { useState } from "react";
import { register } from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = ({ onSubmit, closeModal, openLogin }) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateTextInput = (input) => {
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()\-:;]*$/;
    return regex.test(input);
  };

  const validatePassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});
    setSuccessMessage("");

    const errors = {};

    if (!validatePassword(formData.password, formData.confirmPassword)) {
      errors.password = "Las contraseñas no coinciden.";
    }

    if (!validateTextInput(formData.username)) {
      errors.username = "El nombre de usuario contiene caracteres no permitidos.";
    } else if (formData.username.trim() === "") {
      errors.usernameEmpty = "El nombre de usuario no puede estar vacío o solo contener espacios.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await register(userData);
      console.log("Registro exitoso", response);

      setSuccessMessage("Registro exitoso!");

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error("Error al registrar:", error);
      setFormErrors({ general: "Error al registrar. Verifique los campos." });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div >
      <form onSubmit={handleSubmit}>
      <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 "
        >
          X
        </button>
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src="logoS.svg" 
            alt="Sportify logo"
            className="w-37  mb-4"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white text-left mb-6">Regístrate</h2>

        {/* Formulario */}
        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            maxLength={10}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-white mb-1">Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>

        <div className="mb-4 ">
        <label className="block text-white font-semibold mb-1">Contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
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
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} className="text-white" />    
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="text-white" />          
            )}
          </button>
        </div>

        <div className="mb-4">
        <label className="block text-white font-semibold mb-1">Confirmar contraseña</label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirmar contraseña"
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
            {showConfirmPassword ? (
              <FontAwesomeIcon icon={faEye} className="text text-default-400 pointer-events-none text-white" />    
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="text text-default-400 pointer-events-none text-white" />          
            )}
          </button>
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md mb-4"
        >
          Registrarse
        </button>

        {/* Enlace de inicio de sesión */}
        <p className="text-white text-center mb-4">
          ¿Ya tienes una cuenta?{" "}
          <button 
          className="font-bold bg-transparent"
          onClick={(e) =>{
            e.preventDefault();
            openLogin();
          }}>
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
        <button className="w-full bg-blue-600 text-white p-3 rounded-md flex items-center justify-center">
          <img
            src="google.svg" 
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Registrarse con Google
        </button>
      </form>
    </div>
  );
};
export default RegistrationForm;