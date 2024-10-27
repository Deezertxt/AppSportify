import { Link } from "react-router-dom";
import Search from "./SearchBar";

function Navbar() {
    return (
        <nav className="bg-[#F0F9F9] text-white text-lg flex flex-col lg:flex-row items-center justify-between py-4 px-10">
            <div className="flex flex-col lg:flex-row lg:items-center mt-4 lg:mt-0 lg:justify-center w-full">
                <Search />  
            </div>
        </nav>
    );
}

export default Navbar;