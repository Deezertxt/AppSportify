import  { useState, useEffect } from "react";
import { isValidCover } from "../utils/fileCoverValidator";
import { createAudiobook, getCategories, uploadFilesToFirebase } from '../api/api';  // Importamos la nueva función que sube los archivos a Firebase
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
        documento: null,  // Para el archivo PDF
        portada: null,    // Para la portada
    });

    const [errorMessage, setErrorMessage] = useState(null);  // Estado para mensaje de error
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
            documento: file,
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
                    portada: file,
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
                    portada: file,
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
            documento: null
        });
        setDocumentFileName(""); // Limpiar el nombre del archivo PDF
        setDocumentPreview(null); // Limpiar la vista previa del PDF
        document.getElementById("documento").value = ""; // Restablecer el input file a vacío
    };

    // Función para manejar la cancelación de la portada
    const handleCancelPortada = () => {
        setFormData({
            ...formData,
            portada: null
        });
        setCoverFileName(""); // Limpiar el nombre de la portada
        setPreview(null); // Limpiar la vista previa de la portada
        document.getElementById("portada").value = ""; // Restablecer el input file a vacío
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            // Subir archivos a Firebase y obtener las URLs
            const uploadResponse = await uploadFilesToFirebase(formData.documento, formData.portada);
            if (uploadResponse.status === 200) {
                const { portadaUrl, pdfUrl } = uploadResponse.data;

                const audiobookData = {
                    title: formData.title,
                    author: formData.author,
                    categoryId: formData.category,
                    description: formData.description,
                    portada: portadaUrl,  // URL de la portada en Firebase
                    documento: pdfUrl     // URL del PDF en Firebase
                };

                // Ahora crear el audiolibro en la base de datos
                const response = await createAudiobook(audiobookData);
                console.log('Publicación registrada con éxito:', response);

                // Resetear el formulario
                setFormData({
                    title: "",
                    author: "",
                    category: "",
                    description: "",
                    documento: null,
                    portada: null
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
            documento: null,
            portada: null
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
                                    accept=".pdf"
                                    onChange={handleDocumentoChange}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    required
                                />
                                {formData.documento && (
                                    <button
                                        type="button"
                                        onClick={handleCancelDocumento}
                                        className="bg-[#FF6F61] text-white py-2 px-4 rounded-lg hover:bg-[#FF4F3F] transition-all duration-300"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                )}
                            </div>
                                    <FaImage className="mr-2" /> Elegir archivo
                                </button>

                                {preview && (
                                    <div className="absolute inset-0">
                                        <img src={preview} alt="Vista previa" className="w-full h-full object-cover rounded-lg shadow-lg" />
                                    </div>

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
            </div>
        </div>
    );
}

export default Publicar;

