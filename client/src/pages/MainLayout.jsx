import React from "react";
import { Outlet } from "react-router-dom";
import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DropdownMenu />

      {/* Page Content */}
      <div className="flex-grow flex flex-col">
        {/* Main content */}
        <main className="flex-grow p-4 bg-second">
          <Outlet /> {/* Renderiza las rutas hijas aquí */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
