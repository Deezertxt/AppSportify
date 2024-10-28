import { useState } from "react";
import { motion } from "framer-motion";
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
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-first p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal cierre el modal
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RegistrationForm = ({ closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form>
        {/* Botón de cierre */}
        <button
          type="button"
          onClick={closeModal} // Cierra el modal al hacer clic en "X"
          className="absolute top-2 right-2 text-gray-500 border"
        >
          X
        </button>

        <div className="flex flex-col items-center">
          <img
            src="logoS.svg" // Reemplazar con la ruta del logo.
            alt="Sportify logo"
            className="w-37 mb-4"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white text-left mb-6">Inicio Sesión</h2>

        {/* Formulario */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
            required
          />
        </div>
        
        <div className="mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
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
            <FontAwesomeIcon icon={faEyeSlash} className="text text-default-400 pointer-events-none text-white" />          )}
        </button>
        </div>

        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-md mb-4"
        >
          Iniciar Sesión
        </button>

        {/* Enlace de registro */}
        <p className="text-white text-center mb-4">
          ¿Aun no estas en Sportify?{" "}
          <button className="font-bold bg-transparent">Registrate</button>
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
          src="google.svg" // Reemplazar con el ícono de Google.
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

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={openModal}
        className="bg-blue-600 text-white p-3 rounded-md"
      >
        Iniciar Sesión
      </button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <RegistrationForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};
export default RegistrationModal;