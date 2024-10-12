import { useState, useEffect } from "react";
import { isValidCover } from "../utils/fileCoverValidator";
import { createAudiobook, getCategories, uploadFilesToFirebase } from '../api/api'; 
import { FaTrashAlt, FaFilePdf, FaImage, FaPaperPlane, FaTimes } from 'react-icons/fa';

function Publicar() {
    const [documentFileName, setDocumentFileName] = useState(""); // Nombre del archivo PDF
    const [coverFileName, setCoverFileName] = useState(""); // Nombre del archivo de portada
    const [documentPreview, setDocumentPreview] = useState(null); // Vista previa del PDF
    const [preview, setPreview] = useState(null); // Vista previa de la portada
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        pdfFile: null,  // Para el archivo PDF
        portadaFile: null,    // Para la portada
    });

    const [errorMessage, setErrorMessage] = useState(null);  // Estado para mensaje de error
    const [successMessage, setSuccessMessage] = useState(null); // Estado para mensaje de éxito
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories(); // Obtener categorías
                setCategories(response.data);
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
            }
        };

        fetchCategories();
    }, []);

    // Función para manejar el cambio del archivo PDF
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            pdfFile: file,
        });
        setDocumentFileName(file ? file.name : ""); // Actualiza el nombre del archivo PDF
        setDocumentPreview(file ? URL.createObjectURL(file) : null); // Vista previa del PDF
    };

    // Función para manejar el cambio de la portada
    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const isValid = await isValidCover(file, 200, 300); // Validar si es imagen válida
            if (isValid) {
                setCoverFileName(file.name); // Actualiza el nombre de la portada
                setFormData({
                    ...formData,
                    portadaFile: file,
                });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen
            } else {
                alert("La portada no es válida.");
            }
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const isValid = await isValidCover(file, 200, 300);
            if (isValid) {
                setCoverFileName(file.name); // Actualiza el nombre de la portada
                setFormData({
                    ...formData,
                    portadaFile: file,
                });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen
            } else {
                alert("La portada no es válida.");
            }
        }
    };

    // Función para manejar la cancelación del archivo PDF
    const handleCancelDocumento = () => {
        setFormData({
            ...formData,
            pdfFile: null
        });
        setDocumentFileName(""); // Limpiar el nombre del archivo PDF
        setDocumentPreview(null); // Limpiar la vista previa del PDF
        document.getElementById("pdfFile").value = ""; // Restablecer el input file a vacío
    };

    // Función para manejar la cancelación de la portada
    const handleCancelPortada = () => {
        setFormData({
            ...formData,
            portadaFile: null
        });
        setCoverFileName(""); // Limpiar el nombre de la portada
        setPreview(null); // Limpiar la vista previa de la portada
        document.getElementById("portadaFile").value = ""; // Restablecer el input file a vacío
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);  // Limpiar el mensaje de error
        setSuccessMessage(null); // Limpiar el mensaje de éxito
        
        if (!formData.pdfFile || !formData.portadaFile) {
            setErrorMessage("Por favor, sube un archivo PDF y una portada.");
            return;
        }

        try {
            // Crear un objeto FormData
            const form = new FormData();
            form.append("pdfFile", formData.pdfFile);
            form.append("portadaFile", formData.portadaFile);
            form.append("title", formData.title);
            form.append("author", formData.author);
            form.append("category", formData.category);
            form.append("description", formData.description);

            // Subir archivos a Firebase y obtener las URLs
            const uploadResponse = await uploadFilesToFirebase(form);
            if (uploadResponse.status === 200) {
                const { pdfUrl, portadaUrl } = uploadResponse.data;
                
                if (!pdfUrl || !portadaUrl) {
                    setErrorMessage("Error: No se recuperaron las URLs de los archivos.");
                    return;
                  }

                const audiobookData = {
                    title: formData.title,
                    author: formData.author,
                    categoryId: formData.category,
                    description: formData.description,
                    pdfUrl: pdfUrl,     // URL del PDF en Firebase
                    coverUrl: portadaUrl  // URL de la portada en Firebase
                };

                // Ahora crear el audiolibro en la base de datos
                const response = await createAudiobook(audiobookData);
                console.log('Publicación registrada con éxito:', response);

                setSuccessMessage("Audiolibro publicado con éxito!");

                // Resetear el formulario
                setFormData({
                    title: "",
                    author: "",
                    category: "",
                    description: "",
                    pdfFile: null,
                    portadaFile: null
                });
                setDocumentFileName("");
                setCoverFileName("");
                setPreview(null);
                setDocumentPreview(null);
            }
        } catch (error) {
            console.error("Error al subir los archivos:", error);
            setErrorMessage("Error al registrar la publicación. Verifique los campos.");
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            author: "",
            category: "",
            description: "",
            pdfFile: null,
            portadaFile: null
        });
        setDocumentFileName("");
        setCoverFileName("");
        setPreview(null);
        setDocumentPreview(null);
    };

    return (
        <div className="min-h-screen bg-[#F0F9F9]">
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="text-center mb-6">
                    <span className="text-4xl font-extrabold text-[#213A57]">Registro de Audiolibro</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-between">
                    <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-6">
                        {/* Formulario de texto y selección */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="titulo" className="text-lg font-semibold text-[#213A57]">Titulo*</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    placeholder="Titulo del audiolibro"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="autor" className="text-lg font-semibold text-[#213A57]">Autor*</label>
                                <input
                                    type="text"
                                    id="autor"
                                    name="autor"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    placeholder="Nombre del Autor"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="categoria" className="text-lg font-semibold text-[#213A57]">Categoria*</label>
                                <select
                                    name="categoria"
                                    id="categoria"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="descripcion" className="text-lg font-semibold text-[#213A57]">Descripción*</label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    placeholder="Descripción del audiolibro"
                                    required
                                ></textarea>
                            </div>

                            {/* Campo Documento PDF */}
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    id="documento"
                                    name="documento"
                                    onChange={handleDocumentoChange}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    required
                                />
                                {formData.pdfFile && (
                                    <button
                                        type="button"
                                        onClick={handleCancelDocumento}
                                        className="bg-[#FF6F61] text-white py-2 px-4 rounded-lg hover:bg-[#FF4F3F] transition-all duration-300"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </div>

                            {/* Botones Publicar y Cancelar */}
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-[#0B6477] text-white py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaPaperPlane className="inline-block mr-2" /> Publicar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="w-full bg-[#FF6F61] text-white py-3 rounded-lg hover:bg-[#FF4F3F] transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaTimes className="inline-block mr-2" /> Cancelar
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Columna de Portada */}
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-start gap-6">
                        <div>
                            <label htmlFor="dropZone" className="text-lg font-semibold text-[#213A57]">Portada*</label>
                            <div
                                id="dropZone"
                                className="relative p-10 w-full h-96 border-2 border-[#45DFB1] border-dashed rounded-xl text-center bg-[#F0F9F9] cursor-pointer flex flex-col justify-center items-center"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <p className="text-sm text-[#213A57] mb-4">Arrastra y suelta la imagen o selecciona un archivo</p>
                                <input
                                    type="file"
                                    id="portada"
                                    name="portada"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className="bg-[#14919B] text-white py-2 px-6 rounded-lg hover:bg-[#0B6477] flex items-center justify-center mb-4"
                                    onClick={() => document.getElementById('portada').click()}
                                >
                                    <FaImage className="mr-2" /> Elegir archivo
                                </button>

                                {preview && (
                                    <div className="absolute inset-0">
                                        <img src={preview} alt="Vista previa" className="w-full h-full object-cover rounded-lg shadow-lg" />
                                    </div>
                                )}

                                {formData.portadaFile && (
                                    <button
                                        type="button"
                                        onClick={handleCancelPortada}
                                        className="absolute bottom-2 right-2 bg-[#FF6F61] text-white rounded-full p-2 transform hover:scale-110 transition-all duration-300"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}

                                {/* Nombre de la portada junto al botón limpiar */}
                                {coverFileName && (
                                    <p className="absolute bottom-2 left-2 text-[#213A57]">{coverFileName}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de error */}
                {errorMessage && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <p className="text-xl font-semibold text-red-500">{errorMessage}</p>
                            <button
                                className="mt-4 bg-[#FF6F61] text-white py-2 px-6 rounded-full hover:bg-[#FF4F3F]"
                                onClick={() => setErrorMessage(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal de éxito */}
                {successMessage && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <p className="text-xl font-semibold text-green-500">{successMessage}</p>
                            <button
                                className="mt-4 bg-[#0B6477] text-white py-2 px-6 rounded-full hover:bg-[#14919B]"
                                onClick={() => setSuccessMessage(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Publicar;