import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiBookmark,
  FiChevronsRight,
  FiFolderMinus,
  FiHome,
  FiLogOut,
  FiSearch,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedOption = options.find((option) =>
      currentPath.startsWith(option.to)
    );
    if (selectedOption) setSelected(selectedOption.title);
  }, [location, options]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true, state: { loggedOut: true } });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <motion.div
      layout
      className={`sticky top-0 left-0 min-h-full bg-gradient-to-r from-[#023047] to-[#1b6c92] text-white transition-all duration-300 ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header con Logo */}
      <div className="flex items-center justify-between p-5  border-b border-gray-400">
        <Link to="/inicio">
          <img
            src="/logoS.svg"
            alt="Logo"
            className={`h-10 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          />
        </Link>
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen(!open)}
          className="p-2 text-gray-200 hover:text-white"
        >
          <FiChevronsRight
            className={`transform transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Opciones del menú */}
      <div className="mt-4 space-y-2">
        {options.map(({ title, to, Icon }) => (
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
            {/* Icono siempre visible */}
            <Icon className="text-xl" />
            <span
              className={`ml-4 text-sm font-medium ${!open && "hidden"}`}
            >
              {title}
            </span>
          </Link>
        ))}

        {/* Opciones administrativas solo para el administrador */}
        {user?.email === "yalasoft@gmail.com" && (
          <>
            <Link
              to="/publicar"
              className="group flex items-center p-5 rounded-md hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
            >
              <FiFolderMinus className="text-xl" />
              <span
                className={`ml-4 text-sm font-medium ${!open && "hidden"}`}
              >
                Registro Audiolibros
              </span>
            </Link>
            <Link
              to="/PanelAdmin"
              className="group flex items-center p-5 rounded-md hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
            >
              <FiBarChart className="text-xl" />
              <span
                className={`ml-4 text-sm font-medium ${!open && "hidden"}`}
              >
                Administración
              </span>
            </Link>
          </>
        )}
      </div>

      {/* Footer con Logout */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-400">
        <button
          onClick={handleLogout}
          className="flex items-center w-full space-x-2 rounded-md p-2 hover:bg-gradient-to-r from-[#023047] to-[#082938] hover:text-white"
        >
          <FiLogOut className="text-xl" />
          <span
            className={`text-sm font-medium ${!open && "hidden"}`}
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
