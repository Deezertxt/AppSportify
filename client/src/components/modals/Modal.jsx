import { motion } from "framer-motion";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // No renderiza el modal si isOpen es false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal} // Cierra el modal al hacer clic fuera del contenido
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full max-w-md bg-transparent overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        {children} {/* Renderiza el contenido del modal */}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
