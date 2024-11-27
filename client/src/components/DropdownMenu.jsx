import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiBookmark,
  FiChevronsLeft,
  FiChevronsRight,
  FiFolderMinus,
  FiHome,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Estado para pantallas grandes
  const [isMenuOpen, setMenuOpen] = useState(false); // Estado para pantallas pequeñas (hamburguesa)
  const location = useLocation();
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const options = [
    { title: "Inicio", to: "/inicio", Icon: FiHome },
    { title: "Explorar", to: "/explorar", Icon: FiSearch },
    { title: "Mi biblioteca", to: "/biblioteca", Icon: FiBookmark },
    { title: "Mi perfil", to: `/perfil/${user?.userId}`, Icon: FiUser },
  ];

  const adminOptions = [
    { title: "Registro Audiolibros", to: "/publicar", Icon: FiFolderMinus },
    { title: "Administración", to: "/PanelAdmin", Icon: FiBarChart },
  ];

  const allOptions =
    user?.email === "yalasoft@gmail.com" ? [...options, ...adminOptions] : options;

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedOption = allOptions.find((option) =>
      currentPath.startsWith(option.to)
    );
    if (selectedOption) setSelected(selectedOption.title);
  }, [location, allOptions]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true, state: { loggedOut: true } });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Sidebar para pantallas grandes */}
      <motion.div
        layout
        className={`hidden md:block sticky top-0 left-0 min-h-full bg-gradient-to-r from-[#023047] to-[#1b6c92] text-white transition-all duration-300 ${
          isSidebarOpen ? "w-55" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-5  border-b border-gray-400">
        <Link to="/inicio">
          <img
            src="/logoS.svg"
            alt="Logo"
            className={`h-10 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          />
        </Link>
      </div>
        {/* Botón para expandir/colapsar */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 top-4 bg-[#023047] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          {isSidebarOpen ? (
            <FiChevronsLeft className="text-white text-lg" />
          ) : (
            <FiChevronsRight className="text-white text-lg" />
          )}
        </button>

        {/* Opciones del sidebar */}
        {allOptions.map(({ title, to, Icon }) => (
          <Link
            key={title}
            to={to}
            onClick={() => setSelected(title)}
            className={`group flex items-center p-5 rounded-md transition-colors ${
              selected === title
                ? "bg-gradient-to-r from-[#023047] to-[#082938] text-white"
                : "hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
            }`}
          >
            <Icon className="text-xl" />
            <span
              className={`ml-4 text-sm font-medium ${!isSidebarOpen && "hidden"}`}
            >
              {title}
            </span>
          </Link>
        ))}

        {/* Logout */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-400">
          <button
            onClick={handleLogout}
            className="flex items-center w-full space-x-2 rounded-md p-2 hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
          >
            <FiLogOut className="text-xl" />
            <span
              className={`text-sm font-medium ${!isSidebarOpen && "hidden"}`}
            >
              Cerrar sesión
            </span>
          </button>
        </div>
      </motion.div>

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 bg-transparent rounded focus:outline-none"
        >
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Fondo oscuro al abrir el menú */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMenuOpen ? 0 : "-100%" }}
        exit={{ x: "-100%" }}
        className="fixed top-0 left-0 w-64 h-full bg-gradient-to-r from-[#023047] to-[#3089b1] text-white z-50 p-6"
      >
        {/* Opciones del menú */}
        <div className="flex flex-col space-y-6">
          {options.map(({ title, to, Icon }) => (
            <Link
              key={title}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-4 p-3 rounded-md hover:bg-[#082938] transition-colors"
            >
              <Icon className="text-xl" />
              <span className="text-base font-medium">{title}</span>
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex items-center space-x-4 p-3 rounded-md hover:bg-[#082938] transition-colors"
          >
            <FiLogOut className="text-xl" />
            <span className="text-base font-medium">Cerrar sesión</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
