import React, { useState } from 'react';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="your-logo.svg" alt="Your Company" />
            </div>
            <div className="hidden md:block">
              {/* Menú de navegación para pantallas grandes */}
              {/* ... (igual al código anterior) */}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Botón del menú hamburguesa */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icono del menú hamburguesa (puedes usar un componente de iconos) */}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white">
              Home
            </a>
            {/* Otros enlaces del menú móvil */}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;