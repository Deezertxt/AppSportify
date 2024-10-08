import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
   
    return (
        <nav className="bg-[#0B6477] text-white text-lg flex flex-col lg:flex-row items-center justify-between py-4 px-10">
            <div>
                <img className="block lg:hidden h-20 w-18" src="./logoS.svg" alt="Logo" />
                <img className="hidden lg:block h-20 w-auto" src="./logoS.svg" alt="Logo" />
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center">
                <ul className="flex flex-col lg:flex-row gap-4 lg:gap-24">
                    <li>
                        <Link to={"/"} className="hover:text-gray-400 transition duration-250 ease-in-out"></Link>
                    </li>

                    <li>
                        <Link to={"biblioteca"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Inicio</Link>
                    </li>
                    <li>
                        <Link to={"publicar"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Registrar</Link>
                    </li>

                    

                    <li>
                        <Link to={"reproductor"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Reproductor</Link>
                    </li>

                </ul>

                <div className="flex items-center gap-3 font-bold">
                    <FaUserCircle size={40} />
                    <div>
                        <p className="ml-4 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                            Nombre de Usuario
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;