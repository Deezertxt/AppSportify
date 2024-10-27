import { useState } from "react";
import { motion } from "framer-motion";

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
        className="bg-[#1f56b] p-6 rounded-lg shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="logo.png" // Reemplazar con la ruta del logo.
          alt="Sportify logo"
          className="w-16 mb-4"
        />
        <h1 className="text-3xl font-bold text-white">Sportify</h1>
      </div>

      {/* Título */}
      <h2 className="text-2xl font-bold text-white text-center mb-6">Regístrate</h2>

      {/* Formulario */}
      <div className="mb-4">
        <label className="block text-white mb-1">Nombre de usuario</label>
        <input
          type="text"
          name="username"
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
      <div className="mb-4">
        <label className="block text-white mb-1">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-white mb-1">Confirmar contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border-b-2 border-white bg-transparent focus:outline-none text-white"
          required
        />
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
          src="google-icon.png" // Reemplazar con el ícono de Google.
          alt="Google icon"
          className="w-5 h-5 mr-2"
        />
        Iniciar sesión con Google
      </button>
    </form>
  );
};

const RegistrationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleRegistration = (formData) => {
    console.log("Datos del formulario:", formData);
    // Lógica de envío de formulario
    closeModal();
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={openModal}
        className="bg-[#45DFB1] text-white p-3 rounded-md"
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
