import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { FiMail } from "react-icons/fi";

const VerificarEmail = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { resetPassword } = useAuth();

    const handleResetPassword = async () => {
        if (!email) {
            setError("Por favor, ingrese su correo electrónico.");
            setSuccessMessage("");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de formato de correo
        if (!emailRegex.test(email)) {
            setError("Por favor, ingrese un correo electrónico válido.");
            setSuccessMessage("");
            return;
        }

        const result = await resetPassword(email);

        if (result.success) {
            setSuccessMessage(
                "Correo de recuperación enviado. Por favor revisa tu bandeja de entrada."
            );
            setError("");
        } else {
            setError(result.error || "Error al procesar la solicitud. Inténtalo nuevamente.");
            setSuccessMessage("");
        }
    };


    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gradient-to-r from-[#023047] to-[#8ECAE6]">
            <div className="bg-gray-800 w-full max-w-lg p-8 space-y-6 shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <img src="./logoS.svg" alt="Sportify logo" className="w-20 mb-4" />
                    <h2 className="text-2xl font-bold text-white text-center">
                        Verificación de Email
                    </h2>
                </div>

                {/* Mensajes de error o éxito */}
                {error && (
                    <div className="text-red-700 bg-red-100 border border-red-300 p-3 rounded-md">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="text-green-700 bg-green-100 border border-green-300 p-3 rounded-md">
                        {successMessage}
                    </div>
                )}

                {/* Input para ingresar el correo */}
                <div className="relative mb-6">
                    <label className="text-lg font-semibold text-white block mb-2">
                        Ingrese su correo electrónico
                    </label>
                    <div className="relative">
                        <input
                            placeholder="example@gmail.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#219EBC] focus:ring-2 focus:ring-[#8ECAE6] transition duration-300"
                            required
                        />
                        <FiMail className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-800" />
                    </div>
                </div>


                {/* Botón para enviar el correo */}
                <div className="flex justify-center">
                    <button
                        className="w-full bg-[#219EBC] text-white font-semibold py-3 rounded-lg hover:bg-[#028090] hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
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
