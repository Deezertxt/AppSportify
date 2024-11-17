import React, { useState } from "react";
import { useAuth } from "../context/authContext";

const VerificarEmail = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(""); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const { resetPassword } = useAuth();

    const handleResetPassword = async () => {
        if (!email) {
            setError("Por favor, ingrese su correo electrónico.");
            return;
        }
        try {
            // Llama a la función para enviar el correo de verificación
            await resetPassword(email);
            setSuccessMessage("Correo de recuperación enviado. Por favor revisa tu bandeja de entrada.");
            setError(""); // Limpia errores anteriores
        } catch (error) {
            setError("Error al enviar el correo de recuperación: " + error.message);
            setSuccessMessage(""); // Limpia mensajes de éxito anteriores
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-[#F1FAEE]">
            <div className="bg-[#ABDADC] w-full max-w-xl p-8 space-y-4 shadow-md rounded-lg">
                <div className="flex flex-col items-center">
                    <img src="./logoS.svg" alt="Sportify logo" className="w-24 sm:w-32 mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-2">
                        VERIFICACIÓN DE EMAIL
                    </h2>
                </div>

                {/* Mensajes de error o éxito */}
                {error && <p className="text-red-500 bg-red-100 p-2 rounded-md">{error}</p>}
                {successMessage && (
                    <p className="text-green-500 bg-green-100 p-2 rounded-md">{successMessage}</p>
                )}

                {/* Input para ingresar el correo */}
                <div className="mb-4 relative">
                    <label className="text-white text-lg font-semibold block mb-2">
                        Ingrese su correo electrónico
                    </label>
                    <input
                        placeholder="example@gmail.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
                        className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                        required
                    />
                </div>

                {/* Botón para enviar el correo */}
                <div className="flex justify-center mt-8">
                    <button
                        className="w-full bg-[#0B6477] text-white py-2 sm:py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleResetPassword}
                    >
                        Enviar correo
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default VerificarEmail;

