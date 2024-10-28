import { useState } from "react";
import { motion } from "framer-motion";
import Eye from "./Eye";
import {Button} from "@nextui-org/react"; 

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

const RegistrationForm = ({ onSubmit, closeModal }) => {
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
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Botón de cierre */}
        <div className="flex flex-wrap gap-4 items-end">
        <Button
          type="button"
          onClick={closeModal} // Cierra el modal al hacer clic en "X"
          variant="ghost"
        >
          X
        </Button>
        </div>
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
          <label className="text-white">Correo electrónico</label>
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
        <label className="text-white">Ingresar contraseña</label>
          <Eye placeholder="Ingresar contraseña" className="focus:outline-none" />
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
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
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
        className="bg-blue-600 text-white p-3 rounded-md"
      >
        Iniciar Sesión
      </button>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <RegistrationForm onSubmit={handleRegistration} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default RegistrationModal;
