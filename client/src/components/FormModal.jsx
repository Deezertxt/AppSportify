import { useState } from "react";
import { motion } from "framer-motion";
import { register } from "../api/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-first p-6 rounded-lg shadow-lg w-[450px] h-[690px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RegistrationForm = ({ onSubmit, closeModal }) => {
  
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
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src="logoS.svg" 
            alt="Sportify logo"
            className="w-37  mb-4"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">Regístrate</h2>

        {/* Formulario */}
        <div className="mb-4">
          <label className="block text-white mb-1">Nombre de usuario</label>
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
          <label className="block text-white mb-1">Correo electrónico</label>
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

        <div className="mb-4 relative">
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

        <div className="mb-6 relative">
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
              <FontAwesomeIcon icon={faEye} className="text-white" />    
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="text-white" />          
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
          <a href="#" className="underline">
            Inicia sesión
          </a>
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
          Iniciar sesión con Google
        </button>
      </form>
    </div>
  );
};

const RegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleRegistration = (formData) => {
    console.log("Datos del formulario:", formData);
    closeModal();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={openModal}
        className="bg-[#4b478a] text-white p-3 rounded-md"
      >
        Abrir Registro
      </button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <RegistrationForm onSubmit={handleRegistration} />
      </Modal>
    </div>
  );
};

export default RegistrationModal;