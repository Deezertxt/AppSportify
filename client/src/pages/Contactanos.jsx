import { motion } from "framer-motion";

function Contactanos() {
    return (
        <div className="bg-gradient-to-r from-[#023047] to-[#8ECAE6] min-h-screen flex items-center justify-center p-6 text-white">
            <div className="max-w-4xl w-full bg-white text-black rounded-lg shadow-lg p-8 md:p-12 relative overflow-hidden">
                {/* Efecto 3D */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#8ECAE6] to-[#023047] opacity-40 blur-2xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                ></motion.div>

                <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 relative z-10">
                    ¡Contáctanos!
                </h1>
                <p className="text-center text-gray-700 mb-10 relative z-10">
                    Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo pronto.
                </p>
                <form className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:ring focus:ring-blue-400"
                            placeholder="Tu nombre completo"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:ring focus:ring-blue-400"
                            placeholder="Tu correo electrónico"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-800 font-semibold mb-2">Mensaje</label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg shadow-sm border-gray-300 focus:ring focus:ring-blue-400 resize-none"
                            rows="4"
                            placeholder="Escribe tu mensaje aquí..."
                        ></textarea>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#023047] text-white py-3 rounded-lg font-bold shadow-lg hover:bg-[#014460] transition-all"
                    >
                        Enviar Mensaje
                    </motion.button>
                </form>
            </div>
        </div>
    );
}

export default Contactanos;
