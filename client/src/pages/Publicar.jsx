import React, { useState, useEffect } from "react";
import select from "react-select";       
import { createAudiobook, getCategories } from '../api/api';  // Importamos el servicio


function Publicar() {
    const [fileName, setFileName] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        documento: null,  // Para el documento adjunto
        portada: null,    // Para la portada
    });
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setFileName(file.name);
            setFormData({
                ...formData,
                portada: file
            });
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            documento: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Enviar los datos del formulario a la API
        try {
            const audiobookData = {
                title: formData.titulo,
                author: formData.autor,
                categoryId: formData.categoria,
                description: formData.descripcion,
                documento: formData.documento, // El archivo del documento
                portada: formData.portada      // El archivo de portada
            };

            // Llamada al servicio para registrar el audiolibro
            const response = await createAudiobook(audiobookData);
            console.log('Publicación registrada con éxito', response);

            // Reseteamos el formulario después del éxito
            setFormData({
                title: "",
                author: "",
                category: "",
                description: "",
                documento: null,
                portada: null
            });
            setFileName(""); // Reseteamos el nombre del archivo

        } catch (error) {
            console.error("Error al registrar la publicación:", error);
        }
    };

    return (
        <div className="my-8">
            <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">Publicacion de Contenido</span>
            </div>

            <div className="flex justify-center">
                <form className="w-1/2" onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-20 my-8">
                        <div className="flex flex-col w-1/2 justify-between">
                            <div className="flex flex-col">
                                <label htmlFor="nombre" className="uppercase font-bold">Titulo*</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2 text-center"
                                    placeholder="Nombre del Recurso"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="autor" className="uppercase font-bold">Autor*</label>
                                <input
                                    type="text"
                                    id="autor"
                                    name="autor"
                                    value={formData.autor}
                                    onChange={handleChange}
                                    className="block border rounded-lg p-2 text-center"
                                    placeholder="Nombre del Autor"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="categoria" className="uppercase font-bold">Categoria*</label>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    className="border rounded-lg p-2"
                                    required
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="documento" className="uppercase font-bold">Documento*</label>
                                <input
                                    type="file"
                                    name="documento"
                                    id="documento"
                                    className="block w-full border rounded-lg p-2"
                                    onChange={handleDocumentoChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col w-1/2 gap-14">
                            <div className="flex flex-col">
                                <label htmlFor="descripcion" className="uppercase font-bold">Descripcion*</label>
                                <textarea
                                    name="descripcion"
                                    id="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    cols="30"
                                    rows="10"
                                    placeholder="Descripcion"
                                    className="p-2 resize-none border rounded-lg h-full"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="dropZone" className="uppercase font-bold">Portada*</label>
                                <div
                                    id="dropZone"
                                    className="p-10 bg-white text-gray-500 font-semibold text-base rounded-2xl flex flex-col items-center justify-center border-2 border-gray-300 border-dashed"
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-file-text"
                                    >
                                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M10 9H8"></path>
                                        <path d="M16 13H8"></path>
                                        <path d="M16 17H8"></path>
                                    </svg>
                                    <p className="hidden lg:block">Arrastrar y Soltar</p>
                                    <p id="fileName" className="text-xs font-medium text-gray-400 mt-1">
                                        {fileName || "IMAGEN menor a 5MB"}
                                    </p>
                                    <input
                                        type="file"
                                        id="cv"
                                        name="cv"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <div
                                       id="chooseFile"
                                       className="mt-4 flex h-9 px-6 flex-col bg-[#d4dde9] text-[#4e5a7f] border border-[#4e5a7f] rounded-xl shadow text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none" onClick={() => document.getElementById('cv').click()}>
                                      Elegir Archivo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-[#6177A6] p-3 rounded-lg flex gap-2 mx-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-upload"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        Publicar
                    </button>
                </form>
            </div>
        </div>
    );
}                              

export default Publicar;