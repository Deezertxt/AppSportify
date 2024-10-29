import { motion } from "framer-motion";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // Si isOpen es false, no renderiza el modal

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
        {children} {/* Renderiza el contenido del modal */}
      </motion.div>
    </motion.div>
  );
};

export default Modal;