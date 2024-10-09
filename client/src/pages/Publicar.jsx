import { useState } from "react";

function Publicar() {
    // Estado para manejar la imagen de la portada
    const [portada, setPortada] = useState(null);

    // Estado para manejar otros archivos si es necesario
    const [documento, setDocumento] = useState(null);

    // Maneja la selección de la imagen de portada
    const handlePortadaChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPortada(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecciona un archivo de imagen válido.");
        }
    };

    // Maneja la eliminación de la imagen de portada
    const handleClearPortada = () => {
        setPortada(null);
        document.getElementById("file-image-input").value = null;
    };

    // Maneja la selección de documentos si es necesario
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        // Aquí puedes agregar lógica para manejar documentos si es necesario
        setDocumento(file);
    };

    // Maneja la eliminación de documentos si es necesario
    const handleClearDocumento = () => {
        setDocumento(null);
        document.getElementById("file-input").value = null;
    };

    return (
        <div className="my-8">
            <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">Publicación de Contenido</span>
            </div>

            <div className="flex justify-center">
                <form className="w-1/2">
                    <div className="flex justify-between gap-20 my-8">
                        <div className="flex flex-col w-1/2 gap-8">
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="uppercase font-bold">Nombre*</label>
                                <input type="text" id="nombre"
                                       className="border rounded-lg p-2 text-center"
                                       placeholder="Nombre del Recurso" required/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="autor" className="uppercase font-bold">Autor*</label>
                                <input type="text" id="autor"
                                       className="block border rounded-lg p-2 text-center"
                                       placeholder="Nombre del Recurso" required/>
                            </div>

                            <div>
                                <label htmlFor="documento" className="uppercase font-bold">Documento*</label>
                                <div className="flex gap-4">
                                    <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        accept=".pdf,.doc,.docx,.txt" // Acepta solo formatos de documento
                                        className="block cursor-pointer file:cursor-pointer w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        onChange={handleDocumentoChange}
                                        required
                                    />
                                    <button type="button" onClick={handleClearDocumento}
                                            className="px-2 py-1 bg-red-500 text-white rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucide lucide-trash-2">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" x2="10" y1="11" y2="17"></line>
                                            <line x1="14" x2="14" y1="11" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="descripcion" className="uppercase font-bold">Descripción*</label>
                                <textarea name="descripcion" id="descripcion"
                                          placeholder="Descripción"
                                          className="p-2 resize-none border rounded-lg h-20" required/>
                            </div>
                        </div>

                        <div className="flex flex-col w-1/2 gap-12">

                            <div className="flex flex-col gap-4">
                                <label htmlFor="dropZone" className="uppercase font-bold">Portada*</label>
                                <div className="relative rounded border flex justify-center items-center p-4 h-64">
                                    {portada ? (
                                        <img src={portada} alt="Portada" className="object-cover w-full h-full rounded" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="lucide lucide-book-image h-48 w-48 stroke-gray-500">
                                            <path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17"></path>
                                            <path
                                                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
                                            <circle cx="10" cy="8" r="2"></circle>
                                        </svg>
                                    )}
                                </div>
                                <div className="flex gap-4">
                                    <input
                                        type="file"
                                        name="file-image-input"
                                        id="file-image-input"
                                        accept="image/*" // Solo acepta imágenes
                                        className="block cursor-pointer file:cursor-pointer w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                                        onChange={handlePortadaChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleClearPortada}
                                        className={`px-2 py-1 bg-red-500 text-white rounded ${
                                            !portada ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={!portada} // Deshabilita el botón si no hay portada
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucide lucide-trash-2">
                                            <path d="M3 6h18"></path>
                                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            <line x1="10" x2="10" y1="11" y2="17"></line>
                                            <line x1="14" x2="14" y1="11" y2="17"></line>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                            className="text-white bg-[#6177A6] p-3 rounded-lg flex gap-2 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-upload">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" x2="12" y1="3" y2="15"></line>
                        </svg>
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Publicar;