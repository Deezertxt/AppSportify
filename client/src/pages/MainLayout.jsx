import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/DropdownMenu";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Estado para controlar si el sidebar está abierto o no
  const [darkMode, setDarkMode] = useState(false); // Estado para controlar el modo oscuro

  // Cambiar el tema según el estado de darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Page Content */}
      <div
        className={`flex-grow flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
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
