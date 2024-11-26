import { Link } from "react-router-dom";
import { FaDiscord, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#023047] to-[#1b6c92] text-gray-300 body-font">
            <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row items-center justify-between">
                {/* Logo */}
                <a className="flex title-font font-medium items-center text-white space-x-3">
                    <img className="h-10" src="/logoS.svg" alt="Logo" />
                    <span className="text-xl font-semibold">Sportify</span>
                </a>
                
                {/* Derechos de autor */}
                <p className="text-sm mt-4 sm:mt-0 text-gray-400">
                    © 2024 Sportify — 
                    <a className="text-gray-500 hover:text-white ml-1" target="_blank" rel="noopener noreferrer">@yalasoft</a>
                </p>

                {/* Redes sociales */}
                <div className="flex space-x-4 mt-4 sm:mt-0 justify-center sm:justify-start">
                    <a href="https://discord.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaDiscord className="w-7 h-7" />
                    </a>
                    <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaInstagram className="w-7 h-7" />
                    </a>
                    <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                        <FaXTwitter className="w-7 h-7" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
