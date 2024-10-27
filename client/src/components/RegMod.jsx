import React, { useState } from "react";

function RegMod({ isOpen, closeModal }) {
    // Control del estado para los campos de entrada
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        confirmarContraseña: ""
    });

    // Maneja cambios en los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Manejador para cerrar el modal y resetear el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de registro:", formData);
        closeModal(); // Cierra el modal después de enviar el formulario
    };

    if (!isOpen) return null; // Oculta el modal si no está abierto

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Registro</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-gray-700 mb-1">Nombre de usuario</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Confirmación de contraseña */}
                    <div>
                        <label className="block text-gray-700 mb-1">Confirmar contraseña</label>
                        <input
                            type="password"
                            name="confirmarContraseña"
                            value={formData.confirmarContraseña}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Botón de cerrar */}
                <button
                    onClick={closeModal}
                    className="mt-4 w-full text-sm text-red-500 hover:text-red-700"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}

export default RegMod;
