import { useState, useEffect } from "react";
import { isValidCover } from "../utils/fileCoverValidator";
import { createAudiobook, getCategories, uploadFilesToGCS } from '../api/api';
import { FaTrashAlt, FaFilePdf, FaImage, FaPaperPlane, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router-dom";
import BarLoaderWrapper from "../components/BarLoader";
import { getAudiobookById } from "../api/api";

function Actualizar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [documentFileName, setDocumentFileName] = useState("");
    const [coverFileName, setCoverFileName] = useState("");
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        description: "",
        pdfFile: null,
        portadaFile: null
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [descriptionWarning, setDescriptionWarning] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNavigateHome = () => {
        setIsModalOpen(false);
        navigate('/PanelAdmin');
    };

    // Obtener categorías
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

    // Obtener audiolibro por ID
    useEffect(() => {
        const fetchAudiobook = async () => {
            try {
                const response = await getAudiobookById(id);
                setFormData({
                    title: response.data.title,
                    author: response.data.author,
                    category: response.data.category,
                    description: response.data.description,
                    pdfFile: null,
                    portadaFile: null
                });
                setPreview(response.data.coverUrl); // Vista previa inicial de la portada si ya existe
                setCoverFileName(response.data.coverUrl ? 'Portada Actual' : ''); // Muestra "Portada Actual" como nombre si existe
            } catch (error) {
                console.error("Error al obtener el audiolibro:", error);
            }
        };
        fetchAudiobook();
    }, [id]);

    // Función para manejar el cambio del archivo PDF
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        if (file && validatePDF(file)) {
            setFormData({ ...formData, pdfFile: file });
            setDocumentFileName(file.name);
            setErrors(prevErrors => ({ ...prevErrors, pdfFile: "" }));
        }
        document.getElementById("pdfFile").value = "";
    };

    // Función para manejo de portada al soltar archivo
    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const validationResult = await isValidCover(file);
            if (validationResult === true) {
                setCoverFileName(file.name);
                setFormData({ ...formData, portadaFile: file });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen
                setErrors({ ...errors, portadaFile: "" });
            } else {
                setErrors({ ...errors, portadaFile: validationResult });
            }
        }
    };

    // Función para manejar la selección de portada desde archivo
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const validationResult = await isValidCover(file);
            if (validationResult === true) {
                setCoverFileName(file.name);
                setFormData({ ...formData, portadaFile: file });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen seleccionada
                setErrors({ ...errors, portadaFile: "" });
            } else {
                setErrors({ ...errors, portadaFile: validationResult });
            }
        }
    };

    // Función para manejar la cancelación del archivo PDF
    const handleCancelDocumento = () => {
        setFormData({ ...formData, pdfFile: null });
        setDocumentFileName("");
        document.getElementById("documento").value = "";
    };

    // Función para manejar la cancelación de la portada
    const handleCancelPortada = () => {
        setFormData({ ...formData, portadaFile: null });
        setCoverFileName("");
        setPreview(null);
        document.getElementById("portadaFile").value = "";
    };

    return (
        <div>
            {/* Resto de tu formulario */}
            <div>
                <label htmlFor="dropZone" className="text-lg font-semibold text-[#213A57]">
                    Portada<span className="text-red-500">*</span>
                </label>
                <div
                    id="dropZone"
                    className="relative p-10 w-full h-96 border-2 border-[#45DFB1] border-dashed rounded-xl text-center bg-[#F0F9F9] cursor-pointer flex flex-col justify-center items-center"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <p className="text-sm text-[#213A57] mb-4">Arrastra y suelta la imagen o selecciona un archivo</p>
                    <input
                        type="file"
                        id="portadaFile"
                        name="portadaFile"
                        className="hidden"
                        accept="image/jpeg, image/png, image/webp, image/jpg"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="bg-[#14919B] text-white py-2 px-6 rounded-lg hover:bg-[#0B6477] flex items-center justify-center mb-4"
                        onClick={() => document.getElementById("portadaFile").click()}
                    >
                        <FaImage className="mr-2" /> Elegir archivo
                    </button>

                    {preview && (
                        <div className="absolute inset-0">
                            <img src={preview} alt="Vista previa" className="w-full h-full object-cover rounded-lg shadow-lg" />
                        </div>
                    )}

                    {(formData.portadaFile || formData.coverUrl) && (
                        <button
                            type="button"
                            onClick={handleCancelPortada}
                            className="absolute bottom-2 right-2 bg-[#FF6F61] text-white rounded-full p-2 transform hover:scale-110 transition-all duration-300"
                        >
                            <FaTrashAlt />
                        </button>
                    )}
                </div>
                {errors.portadaFile && (
                    <p className="text-red-500 text-sm">{errors.portadaFile}</p>
                )}
            </div>
            {/* Resto del formulario */}
        </div>
    );
}

export default Actualizar;
