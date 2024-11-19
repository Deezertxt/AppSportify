import React, { useState, useEffect, useRef } from 'react';
import DropdownMenu from '../components/DropdownMenu';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controla el menú desplegable
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Controla el campo de búsqueda
  const menuRef = useRef(null);

  // Alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Alternar el estado del campo de búsqueda
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Cerrar el menú al hacer clic fuera
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.menu-icon')) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="relative flex items-center p-4 bg-first border-b border-gray-300">

<div className="flex items-center justify-center flex-grow space-x-6">
  <img
    src="User.png"
    alt="Decorative"
    className="w-8 h-8 italic rounded-full"
  />
  <img src="logoS.svg" alt="Logo" className="w-10 h-10" />
  <h1 className="text-xl font-semibold text-white">Sportify</h1>
</div>
      {/* Search Bar */}

<div className="ml-auto relative">
  <button
    className="text-white"
    onClick={toggleSearch}
  >
    <HiOutlineMagnifyingGlass size={24} />
  </button>
  {isSearchOpen && (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center p-4">

      <div className="relative w-full max-w-lg">
        <HiOutlineMagnifyingGlass
          size={20}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 outline-none border-2 border-gray-300 rounded-lg text-lg p-2 focus:border-blue-500"
        />
      </div>
      <button
        className="mt-4 text-blue-500 font-semibold"
        onClick={toggleSearch}
      >
        Close
      </button>
    </div>
  )}
</div>


   
      <div
        className="ml-4 flex flex-col justify-center cursor-pointer space-y-1 menu-icon"
        onClick={toggleMenu}
      >
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#F1FAEE] opacity-50 z-40"></div>
      )}

      
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute left-0 top-0 max-h-screen w-auto bg-white shadow-lg z-50"
        >
          <DropdownMenu />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
