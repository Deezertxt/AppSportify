import React, { useState } from 'react';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  return (
    <div className='fixed inset-0 justify-center flex items-center p-4'>
        <div className='bg-[#ABDADC] w-full max-w-xl p-8 space-y-4 shadow-md rounded-lg'>
            <div>
                <div className="flex flex-col items-center">
                    <img src="./logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-6">RESTABLECER CONTRASEÑA</h2>
            </div>

                <div className='mb-2 relative'>
                    <label className='text-white text-xl font-semibold block mb-2'>Ingrese su nueva contraseña</label>
                    <input placeholder='*********'
                    type='password'
                    className='w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]'></input>
                </div>
                
                <div className='mb-2 relative'>
                <label className='text-white text-xl font-semibold block mb-2'>Confirmar contraseña</label>
                    <input placeholder='*********'
                    type='password'
                    className='w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]'></input>
                </div>
                <div className='px-14 items-center justify-center'>
                    <button className='w-full bg-[#0B6477] text-white py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105'>
                        ENVIAR</button>
                </div>
            </div>
    </div>
  );
};

export default ResetPassword;