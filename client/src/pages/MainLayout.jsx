// MainLayout.jsx
import React from "react";
import DropdownMenu from "../components/DropdownMenu";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DropdownMenu />

      {/* Page Content */}
      <div className="flex-grow flex flex-col">
        {/* Main content */}
        <main className="flex-grow p-4 bg-gray-100">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
