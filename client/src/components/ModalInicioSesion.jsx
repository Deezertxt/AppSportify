import React from 'react';

const ModalInicioSesion = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-blue-200 rounded-lg p-6 w-96 shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
        <div className="flex flex-col items-center space-y-4">
          
          <img src='/AppSportify/client/public/logo.png' alt="Logo" className="w-36 h-auto mb-2" />

          <div className="text-3xl font-semibold text-blue-700">Sportify</div>
          <div className='font-semibold w-72'>Login</div>

          <form action="" class="mt-10 space-y-8 dark:text-white">
            
            <div>
              <div class="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input id="" type="email" placeholder="Email" class="w-72 bg-transparent pb-3  border-b border-black dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"/>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <div class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                <input id="" type="password" placeholder="Password" class="w-full bg-transparent pb-3  border-b border-black dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"/>
              </div>
            </div>

            <div>
              <button
              class="w-full rounded-lg bg-[#003465] dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                <span class="text-base font-semibold text-white dark:text-gray-900">Login</span>
              </button>
              <button href="#" type="reset" class="-ml-3 w-max p-3">
              <p class="text-sm tracking-wide text-white dark:text-sky-400">Don't have an account yet? <span className='font-bold'>Register for free</span></p>
              </button>
            </div>
          </form>

          <div className="flex items-center w-64">
            <hr className="w-full border-black" />
            <span className="mx-2 text-gray-500">Or</span>
            <hr className="w-full border-black" />
          </div>
          <button className="w-72 flex items-center justify-center bg-[#003465] text-white p-3 h-11 rounded-lg">
            <span className="mr-2">G</span> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInicioSesion;