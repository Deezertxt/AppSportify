import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer class="text-gray-400 bg-[#6177A6] body-font">
            <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
                    <img className="block lg:hidden h-12 w-16" src="./public/logoS.svg" alt="Logo" />
                    <img className="hidden lg:block h-12 w-auto" src="./public/logoS.svg" alt="Logo" />
                    <span class="ml-3 text-xl">Sportify</span>
                </a>
                <p class="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2024 Sportify —
                    <a href="https://twitter.com/knyttneve" class="text-gray-450 ml-1" target="_blank" rel="noopener noreferrer">@yalasoft</a>
                </p>
                <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a class="text-gray-400">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d=""></path>
                        </svg>
                    </a>
                    <a class="ml-3 text-gray-400">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                    </a>
                    <a class="ml-3 text-gray-400">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                    <discicon href="https://discord.com" className="ml-3 text-gray-400" target="_blank" rel="noopener noreferrer">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                        >
                            <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.522.07.07 0 00-.074.035c-.207.372-.441.858-.606 1.237a19.736 19.736 0 00-5.876 0 11.281 11.281 0 00-.617-1.237.076.076 0 00-.074-.035c-1.612.27-3.162.738-4.885 1.522a.063.063 0 00-.031.027C.533 9.537-.32 14.602.099 19.603a.082.082 0 00.031.055c2.052 1.513 4.025 2.417 5.967 3.029a.082.082 0 00.086-.027c.461-.63.874-1.295 1.237-1.984a.076.076 0 00-.043-.104c-.652-.247-1.27-.542-1.868-.88a.075.075 0 01-.007-.127c.124-.094.248-.19.365-.286a.072.072 0 01.075-.01c3.927 1.784 8.18 1.784 12.061 0a.073.073 0 01.076.01c.117.096.241.192.365.286a.075.075 0 01-.005.127 12.298 12.298 0 01-1.87.88.076.076 0 00-.043.104c.382.689.795 1.354 1.237 1.984a.08.08 0 00.086.028c1.942-.612 3.915-1.516 5.967-3.029a.077.077 0 00.031-.055c.455-5.014-.725-10.064-4.432-15.207a.052.052 0 00-.032-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.42 0-1.335.955-2.421 2.156-2.421 1.202 0 2.176 1.086 2.176 2.421 0 1.335-.954 2.42-2.176 2.42zm7.974 0c-1.182 0-2.156-1.085-2.156-2.42 0-1.335.955-2.421 2.156-2.421 1.202 0 2.176 1.086 2.176 2.421 0 1.335-.954 2.42-2.176 2.42z" />
                        </svg>
                    </discicon>
                </span>
            </div>
        </footer>
    )
}
export default Footer;