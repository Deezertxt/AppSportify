import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import Modal from "../components/modals/Modal";
import ModalInicioSesion from "../components/modals/ModalInicioSesion";
import ModalRegistro from "../components/modals/ModalRegistro";
import ModalReu from "../components/modals/ModalReu";
import { useLocation } from "react-router-dom";
import Carousel from "../components/Carousel"; // Importa el carrusel

function HeroSection() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isCierreSesionOpen, setCierreSesionOpen] = useState(false);
  const location = useLocation();

  const openLoginModal = () => {
    setModalOpen(true);
    setIsLogin(true);
  };

  const openRegisterModal = () => {
    setIsLogin(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleForm = () => setIsLogin(!isLogin);

  useEffect(() => {
    if (location.state?.loggedOut) {
      setCierreSesionOpen(true);

      // Limpia el estado `loggedOut` después de detectarlo
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const closeCierreSesionModal = () => {
    setCierreSesionOpen(false);
  };

  const images = [
    "https://th.bing.com/th/id/OIP.QOdvgh_Ux_miVXR3sQTTPgHaHa?w=600&h=600&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.KX-lQ4NFjREMYBISvcz17AAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.2d4CIe6barxxhzUJU6ma2gHaJR?w=510&h=639&rs=1&pid=ImgDetMain",
    "https://cdn.cnn.com/cnnnext/dam/assets/150921171621-05-what-a-shot-0922-tease-super-169.jpg",
    "https://th.bing.com/th/id/OIP.XPlyHd9EGxt1T8Kw09cyAwHaJQ?w=640&h=800&rs=1&pid=ImgDetMain",
  ];

  return (
    <div className="bg-gradient-to-r from-[#023047] to-[#8ECAE6] min-h-screen flex flex-col text-white">
      <Navbar openLoginModal={openLoginModal} />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 md:py-40 relative z-10">
        <div className="max-w-lg text-center md:text-left space-y-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#508ca9] to-[#176082]"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Vive la emoción del deporte con los mejores audiolibros.
          </motion.h1>
          <p className="text-lg text-gray-100 mb-6 md:max-w-xl">
            Audiolibros exclusivos de <span className="highlight bg-yellow-300 text-black px-2 py-1 rounded">NBA</span>,{" "}
            <span className="highlight bg-blue-300 text-black px-2 py-1 rounded">fútbol</span> y{" "}
            <span className="highlight bg-green-300 text-black px-2 py-1 rounded">voleibol</span>, ¡en solo 10 minutos!
          </p>
          <div className="space-x-4">
            <button
              onClick={openRegisterModal}
              className="bg-[#217e73] px-6 py-3 text-lg rounded-full shadow-lg hover:bg-[#264653] transition-all"
            >
              Comienza Ahora
            </button>
            <button
              onClick={openLoginModal}
              className="bg-transparent border-2 border-white px-6 py-3 my-4 text-lg rounded-full shadow-lg hover:bg-[#264653] hover:border-[#264653] transition-all"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <Carousel images={images} />
      </div>

      {/* Sección de características */}
      <div className="bg-white text-black py-20 px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 text-[#023047]">
            ¿Por qué elegir nuestros audiolibros?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              className="p-6 bg-[#508ca9] text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">Historias Cortas</h3>
              <p className="mt-2">
                Disfruta de relatos deportivos resumidos y narrados en menos de 5 minutos.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-[#176082] text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">Inspiración Deportiva</h3>
              <p className="mt-2">
                Encuentra las historias que te motivarán a dar lo mejor de ti.
              </p>
            </motion.div>
            <motion.div
              className="p-6 bg-[#264653] text-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold">Narradores Expertos</h3>
              <p className="mt-2">
                Escucha una voz sintética que da vida a cada relato deportivo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="bg-gradient-to-r from-[#176082] to-[#508ca9] text-white py-20 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Lo que dicen nuestros oyentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              className="p-6 bg-white text-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p>
                "Las historias son inspiradoras y me ayudan a empezar el día con energía."
              </p>
              <h4 className="mt-4 font-bold text-[#023047]">- Carlos</h4>
            </motion.div>
            <motion.div
              className="p-6 bg-white text-black rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p>
                "La calidad de audio y la pasión de los narradores son inigualables."
              </p>
              <h4 className="mt-4 font-bold text-[#023047]">- Sofía</h4>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#023047] text-white py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Sportify. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modales */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          {isLogin ? (
            <ModalInicioSesion closeModal={closeModal} openRegister={toggleForm} />
          ) : (
            <ModalRegistro closeModal={closeModal} openLogin={toggleForm} />
          )}
        </Modal>
      )}

      {isCierreSesionOpen && (
        <ModalReu
          title="¡Cierre de Sesión exitoso de Sportify!"
          message="Esperamos verte pronto de nuevo."
          onClose={closeCierreSesionModal}
        />
      )}
    </div>
  );
}

export default HeroSection;
