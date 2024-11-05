import { Link } from "react-router-dom";
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-gray-400 bg-first  body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                    <img className="block lg:hidden h-14 w-16" src="/logoS.svg" alt="Logo" />
                    <img className="hidden lg:block h-14 w-auto" src="/logoS.svg" alt="Logo" />
                    <span className="ml-3 text-xl">Sportify</span>
                </a>
                <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-400 sm:py-2 sm:mt-0 mt-4">© 2024 Sportify —
                    <a className="text-gray-450 ml-1" target="_blank" rel="noopener noreferrer">@yalasoft</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a href="https://discord.com" className="ml-3 text-gray-400" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="w-8 h-8" />
                    </a>
                    <a href="https://instagram.com" className="ml-3 text-gray-400" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="w-8 h-8" />
                    </a>
                    <a href="https://twitter.com" className="ml-3 text-gray-400" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="w-8 h-8" />
                    </a>
                </span>
            </div>
        </footer>
    )
}
export default Footer;