import React, { useState } from "react";

function Publicar() {
    const [fileName, setFileName] = useState("");

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <div className="my-8">
            <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">Publicacion de Contenido</span>
            </div>

            <div className="flex justify-center">
                <form className="max-w-3xl">
                    <div className="flex justify-between gap-8 my-8">
                        <div className="flex flex-col w-1/2 justify-between">
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="uppercase font-bold">Nombre*</label>
                                <input type="text" id="nombre"
                                       className=" border rounded-lg p-2 text-center"
                                       placeholder="Nombre del Recurso" required/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="autor" className="uppercase font-bold">Autor*</label>
                                <input type="text" id="autor"
                                       className="block border rounded-lg p-2 text-center"
                                       placeholder="Nombre del Recurso" required/>
                            </div>


                            <div className="flex flex-col">
                                <label htmlFor="equipos" className="uppercase font-bold">Equipo*</label>
                                <select name="equipos" id="equipos" className="border rounded-lg p-2">
                                    <option value="equipo1">Equipo 1</option>
                                    <option value="equipo2">Equipo 2</option>
                                    <option value="equipo3">Equipo 3</option>
                                    <option value="equipo4">Equipo 4</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="documento" className="uppercase font-bold">Documento*</label>
                                <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"/>
                            </div>
                        </div>

                        <div className="flex flex-col w-1/2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="descripcion" className="uppercase font-bold">Descripcion*</label>
                                <textarea name="descripcion" id="descripcion" cols="30" rows="10"
                                          placeholder="Descripcion"
                                          className=" p-2 resize-none border rounded-lg max-h-24"/>
                            </div>

                            <div>
                                <label htmlFor="dropZone" className="uppercase font-bold">Portada*</label>
                                <div id="dropZone"
                                     className="p-10 bg-white text-gray-500 font-semibold text-base rounded-2xl flex flex-col items-center justify-center border-2 border-gray-300 border-dashed font-[sans-serif]"
                                     onDrop={handleDrop}
                                    onDragOver={handleDragOver}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                                         fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-file-text">
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M10 9H8"></path>
                                        <path d="M16 13H8"></path>
                                        <path d="M16 17H8"></path>
                                    </svg>
                                    <p className="hidden lg:block">Arrastar y Soltar</p>
                                    <p id="fileName"
                                       className="text-xs font-medium text-gray-400 mt-1">{fileName || "IMAGEN menor a 5MB"}</p>
                                    <input type="file" id="cv" name="cv" className="hidden" onChange={handleFileChange}/>
                                    <div id="chooseFile"
                                         className="mt-4 flex h-9 px-6 flex-col bg-[#d4dde9] text-[#4e5a7f] border border-[#4e5a7f] rounded-xl shadow text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none" onClick={() => document.getElementById('cv').click()}>
                                        Elegir Archivo
                                    </div>
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