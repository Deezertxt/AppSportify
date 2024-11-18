import React, { useState, useEffect } from "react";


import { FiBarChart, FiBookmark, FiChevronsRight, FiFolderMinus, FiHome, FiLogOut, FiSearch, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const DropdownMenu = () => {
  return (
    <div className="w-auto bg-second flex-shrink-0 justify-end">
      <Sidebar />
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const [selected, setSelected] = useState("Inicio");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

const handleLogout = async () => {
  try {
      await logout(); // Cierra sesión y actualiza el estado
      console.log("Usuario cerrado sesión, redirigiendo...");
      navigate("/", { replace: true, state: { loggedOut: true } }); // Redirige sin recargar la página
  } catch (error) {
      console.error("Error al cerrar sesión:", error);
  }
};


    return (
      <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-first p-2"
      style={{
        width: open ? "200px" : "fit-content",
      }}
    >
      <TitleSection open={open} />
      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Inicio"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/libros"
        />
        <Option
          Icon={FiSearch}
          title="Explorar"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/explorar"
        />
        <Option
          Icon={FiBookmark}
          title="Mi biblioteca"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to="/biblioteca"
        />

        <Option
          Icon={FiUser}
          title="Perfil"
          selected={selected}
          setSelected={setSelected}
          open={open}
          to={`/editarPerfil/${user?.id}`}
        />

        {user?.email === "yalasoft@gmail.com" && (
          <>
            <Option
              Icon={FiFolderMinus}
              title="Registro Audiolibros"
              selected={selected}
              setSelected={setSelected}
              open={open}
              to="/publicar"
            />
            <Option
              Icon={FiBarChart}
              title="Administración"
              selected={selected}
              setSelected={setSelected}
              open={open}
              to="/PanelAdmin"
            />
          </>
        )}
        
      </div>

      

      {/* Botón de Cerrar Sesión con icono */}
      <div className="mt-auto mb-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full justify-center text-gray-50 hover:bg-gray-800 p-2 rounded-md"
        >
          <FiLogOut className="text-xl" />
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-lg font-medium"
            >
              Cerrar sesión
            </motion.span>
          )}
        </button>
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

  const Option = ({ Icon, title, selected, setSelected, open, notifs, to }) => {
    return (
      <Link to={to} className="w-full" onClick={() => setSelected(title)}>
        <motion.button

          layout
          onClick={() => setSelected(title)}
          className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-white text-gray-600" : "text-gray-50 hover:bg-gray-800"}`}
        >

          <motion.div
            layout
            className="grid h-full w-16 place-content-center text-xl"
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
        <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-800">
          <div className="flex items-center  ">
            <Logo />
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              />

            )}
          </div>
        </div>
      </div>
    );
  };

  const Logo = () => {
    return (
      <motion.div
        layout
        className="grid size-16 shrink-0 place-content-center rounded-md  "
      >

        <Link to="/libros">{ }
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
        className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-gray-800"
      >
        <div className="flex items-center p-2 text-white">
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

  export default DropdownMenu;
