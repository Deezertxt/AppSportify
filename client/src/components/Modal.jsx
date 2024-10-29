Modal

import { motion } from "framer-motion";

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
    </motion.div>
  );
};

const LoaderWrapper = ({ children, isLoading }) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 z-10">
          <BarLoader />
        </div>
      )}
    </div>
  );
};

const FormWithLoader = ({ isLoading }) => {
  return (
    <LoaderWrapper isLoading={isLoading}>
      <form className="bg-white p-6 rounded-lg shadow-md">
        {/* Aquí van los campos de tu formulario */}
        <input type="text" placeholder="Tu nombre" className="border p-2 mb-4 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar</button>
      </form>
    </LoaderWrapper>
  );
};

export default FormWithLoader;