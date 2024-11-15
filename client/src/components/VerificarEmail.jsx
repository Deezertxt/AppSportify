import React, { useRef } from "react";

const VerificarEmail = () => {
    const inputRefs = useRef([]);

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className='fixed inset-0 justify-center flex items-center p-4 bg-[#F0F9F9]'>
            <div className='bg-[#ABDADC] w-full max-w-xl p-8 space-y-4 shadow-md rounded-lg'>
                <div className="flex flex-col items-center">
                    <img src="./logoS.svg" alt="Sportify logo" className="w-24 sm:w-32 mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-4 sm:mb-6">VERIFICACIÓN DE EMAIL</h2>
                </div>
                
                <div className="flex flex-col items-center p-3 sm:p-5">
                    <h1 className="font-bold text-center text-sm sm:text-base">
                        Te enviamos un código a tu email example@gmail.com
                    </h1>
                </div>

                <div className="flex-col flex space-y-8 sm:space-y-16">
                    <div className="flex items-center justify-center mx-auto space-x-3 sm:space-x-4">
                        {[...Array(4)].map((_, i) => (
                            <input 
                                key={i} 
                                ref={(el) => (inputRefs.current[i] = el)}
                                maxLength="1"
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-12 h-12 sm:w-16 sm:h-16 text-center rounded-xl border-2 border-[#45DFB1] text-lg bg-white outline-first px-3 sm:px-5 focus:bg-gray-50 focus:ring-1 ring-first" 
                            />
                        ))}
                    </div>
                </div>

                <div className="place-items-center">
                    <div className="flex justify-center w-40">
                        <button className="w-full bg-[#0B6477] text-white py-2 sm:py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105">
                            Verificar cuenta
                        </button>
                    </div>
                </div>

                <div>
                    <h1 className="font-semibold text-center text-sm sm:text-base">
                        ¿No recibiste el código? 
                        <button className="text-[#0B6477] bg-transparent font-bold cursor-pointer p-1">
                            Reenviar código
                        </button>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default VerificarEmail;