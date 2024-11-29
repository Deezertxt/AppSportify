import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext"; // Importa el contexto
import { Outlet } from "react-router-dom";
import Sidebar from "../components/DropdownMenu";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Estado para controlar si el sidebar está abierto o no
  const { darkMode, setDarkMode } = useTheme(); // Accede al estado y función del contexto

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Page Content */}
      <div
        className={`flex-grow flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-60" : "w-16"
        } ${
          darkMode ? "bg-gradient-to-r from-[#023047] to-[#082938] text-white" : "bg-white text-gray-800"
        }`}
      >
        {/* Toggle dark mode button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 fixed top-5 right-5 border-indigo-900 text-white rounded-full transition duration-200 hover:bg-indigo-600"
        >
          {darkMode ? "🌙" : "🌞"}
        </button>

        {/* Main Content */}
        <main className="flex-grow p-7">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
