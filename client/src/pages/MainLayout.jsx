import React from "react";
import { Outlet } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";
import Navbar from "./Navbar,";
const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Solo visible en pantallas grandes) */} 
      <div className="hidden lg:block">
        <DropdownMenu />
      </div>

      {/* Page Content */}
      <div className="flex-grow flex flex-col min-h-screen">
        {/* Navbar (Solo visible en pantallas pequeñas) */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Main content */}
        <main className="flex-grow p-7 bg-second">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;


