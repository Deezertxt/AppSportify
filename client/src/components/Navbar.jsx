import { Link } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
   
    return (
        <nav className="bg-[#6177A6] text-white text-lg flex items-center justify-between py-4 px-10">
            <div>
                <img className="block lg:hidden h-20 w-18" src="./logoS.svg" alt="Logo" />
                <img className="hidden lg:block h-20 w-auto" src="./logoS.svg" alt="Logo" />
            </div>

            <div>
                <ul className="flex gap-24">
                    <li>
                        <Link to={"/"} className="hover:text-gray-400 transition duration-250 ease-in-out">Inicio</Link>
                    </li>

                    <li>
                        <Link to={"publicar"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Publicar</Link>
                    </li>

                    <li>
                        <Link to={"biblioteca"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Biblioteca</Link>
                    </li>

                    <li>
                        <Link to={"reproductor"}
                            className="hover:text-gray-400 transition duration-250 ease-in-out">Reproductor</Link>
                    </li>

                </ul>
            </div>

            <div className="flex items-center gap-3 font-bold">
                <FaUserCircle size={40} />
                <div>
                    <p className="ml-4 py-2 leading-5 font-medium font-semibold hover:text-gray-300 transition duration-250 ease-in-out">
                        Nombre de Usuario
                    </p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;