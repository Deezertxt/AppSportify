import React, { useState, useEffect } from "react";
import {
  FiBarChart,
  FiBook,
  FiChevronDown,
  FiChevronsRight,
  FiFolderMinus,
  FiHome,
  FiLogIn,
  FiMenu,
  FiSearch,
  FiTag,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = () => {
  return (
    <div className="w-auto bg-second flex-shrink-0 justify-end">
      <Sidebar />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const [selected, setSelected] = useState("Inicio");

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setSelected("Inicio");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setOpen(true);
      } else {
        setOpen(false); // Close the sidebar on mobile resize
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 text-white bg-gray-800 fixed top-0 left-0 z-50"
        >
          <FiMenu size={24} />
        </button>
      )}
      <motion.nav
        layout
        className={`fixed top-0 h-screen shrink-0 border-r border-slate-300 bg-[#0B6477] p-2 transition-transform ${
          open ? "translate-x-0 z-50" : "-translate-x-full"
        } ${isMobile ? "w-[70%]" : "w-56"}`} // Cambiar a w-[70%] para dispositivos móviles
      >
        {isMobile && open && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-white"
          >
            <FiX size={24} />
          </button>
        )}

        <TitleSection open={open} />

        <div className="space-y-1">
          <Option
            Icon={FiHome}
            title="Inicio"
            selected={selected}
            setSelected={setSelected}
            open={open}
            to="/"
          />
          <Option
            Icon={FiSearch}
            title="Buscar"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={FiBook}
            title="Biblioteca"
            selected={selected}
            setSelected={setSelected}
            open={open}
            to="/taskpage"
          />
          <Option
            Icon={FiFolderMinus}
            title="Registro Audiolibros"
            selected={selected}
            setSelected={setSelected}
            open={open}
            to="/publicar"
          />
          <Option
            Icon={FiLogIn}
            title="Inicio sesión"
            selected={selected}
            setSelected={setSelected}
            open={open}
            to="/login"
          />
          <Option
            Icon={FiUsers}
            title="Usuarios"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={FiBook}
            title="Preview"
            selected={selected}
            setSelected={setSelected}
            open={open}
            to="/Preview"
          />
        </div>

        <ToggleClose open={open} setOpen={setOpen} />
      </motion.nav>
    </>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, notifs, to }) => {
  return (
    <Link to={to} className="w-full" onClick={() => setSelected(title)}>
      <motion.button
        layout
        onClick={() => setSelected(title)}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title ? "bg-white text-gray-600" : "text-gray-50 hover:bg-gray-800"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-xl"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-x font-medium"
          >
            {title}
          </motion.span>
        )}
        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-sky-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-gray-800">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              {/* Additional title can be added here */}
            </motion.div>
          )}
        </div>
        {open && <FiChevronDown className="mr-5" />}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-20 shrink-0 place-content-center rounded-md bg-[#F0F9F9]"
    >
      <Link to="/">
        <img className="block lg:hidden h-20 w-18" src="/logoS.svg" alt="Logo" />
        <img className="hidden lg:block h-20 w-auto" src="/logoS.svg" alt="Logo" />
      </Link>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2 text-gray-400">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight className={`transition-transform ${open && "rotate-180"}`} />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-x font-medium"
          >
            Ocultar
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

// Export the component directly
export default DropdownMenu;
