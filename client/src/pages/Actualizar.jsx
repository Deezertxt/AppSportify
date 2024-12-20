import { useState, useEffect } from "react";
import { isValidCover } from "../utils/fileCoverValidator";
import { updateAudiobook, getCategories, uploadFilesToGCS } from '../api/api';
import { FaTrashAlt, FaFilePdf, FaImage, FaPaperPlane, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import BarLoaderWrapper from "../components/BarLoader";
import { getAudiobookById } from "../api/api";
import { useParams } from "react-router-dom";

function Actualizar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [documentFileName, setDocumentFileName] = useState(""); // Nombre del archivo PDF
    const [coverFileName, setCoverFileName] = useState(""); // Nombre del archivo de portada
    const [preview, setPreview] = useState(null);
    const [originalData, setOriginalData] = useState(null);


    const [formData, setFormData] = useState({
        title: "",
        author: "",
        categoryId: "",
        description: "",
        pdfFile: null,  // Para el archivo PDF
        portadaFile: null,    // Para la portada
    });


    const [errors, setErrors] = useState({});  // Estado para manejar errores
    const [successMessage, setSuccessMessage] = useState(null); // Estado para mensaje de éxito
    const [categories, setCategories] = useState([]);
    const [descriptionWarning, setDescriptionWarning] = useState(""); // Advertencia de caracteres en descripción
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar la carga

    const [isModalOpen, setIsModalOpen] = useState(false); //Estado para el modal

    const handleNavigateHome = () => {
        setIsModalOpen(false);
        navigate('/PanelAdmin');
    };

    useEffect(() => {
        const fetchCategoriesAndAudiobook = async () => {
            try {
                const categoriesResponse = await getCategories();
                const categoriesData = categoriesResponse.data;

                const audiobookResponse = await getAudiobookById(id);
                const audiobookData = audiobookResponse.data;

                setCategories(categoriesData);
                const pdfFileName = audiobookData.pdfUrl ? audiobookData.pdfUrl.split('/').pop() : '';

                const initialData = {
                    title: audiobookData.title || "",
                    author: audiobookData.author || "",
                    categoryId: audiobookData.categoryId || "",
                    description: audiobookData.description || "",
                    pdfFile: pdfFileName || null,
                    portadaFile: audiobookData.coverUrl || null,
                };
                setOriginalData(initialData); // Guardar datos originales
                setFormData(initialData);
                setDocumentFileName(pdfFileName);
                setPreview(audiobookData.coverUrl);
                setCoverFileName(audiobookData.coverUrl ? 'Portada Actual' : '');
            } catch (error) {
                console.error("Error al obtener categorías o audiolibro:", error);
            }
        };

        fetchCategoriesAndAudiobook();
    }, [id]);

    const handleCategoryChange = (e) => {
        setFormData({
            ...formData,
            categoryId: e.target.value,
        });
    };


    // Validar que el archivo sea un PDF y no exceda 50MB
    const validatePDF = (file) => {
        const isPDF = file.type === 'application/pdf';
        const isUnderSize = file.size <= 50 * 1024 * 1024; // 50MB
        if (!isPDF) {
            setErrorMessage("Solo se permiten archivos PDF.");
            return false;
        }
        if (!isUnderSize) {
            setErrors(prevErrors => ({ ...prevErrors, pdfFile: "El archivo no puede ser mayor a 50 MB." }));
            return false;
        }
        return true;
    };

    // Validar caracteres especiales en los campos de texto
    const validateTextInput = (input) => {
        const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()\-:;]*$/;
        return regex.test(input);
    };

    // Función para manejar el cambio del archivo PDF
    const handleDocumentoChange = (e) => {
        const file = e.target.files[0];
        if (file && validatePDF(file)) {
            setFormData({
                ...formData,
                pdfFile: file,
            });
            setDocumentFileName(file.name); // Actualiza el nombre del archivo PDF
            setErrors(prevErrors => ({ ...prevErrors, pdfFile: "" })); // Limpiar error del archivo
        }
        document.getElementById("pdfFile").value = ""; // Cerrar explorador de archivos después de selección
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const validationResult = await isValidCover(file);
            if (validationResult === true) {
                setCoverFileName(file.name); // Actualiza el nombre de la portada
                setFormData({
                    ...formData,
                    portadaFile: file,
                });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen
                setErrors({ ...errors, portadaFile: "" }); // Limpiar el error si es válido
            } else {
                setErrors({ ...errors, portadaFile: validationResult }); // Mostrar el error de validación
            }
        }
    };


    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const validationResult = await isValidCover(file);
            if (validationResult === true) {
                setCoverFileName(file.name); // Actualiza el nombre de la portada
                setFormData({
                    ...formData,
                    portadaFile: file,
                });
                setPreview(URL.createObjectURL(file)); // Vista previa de la imagen
                setErrors({ ...errors, portadaFile: "" }); // Limpiar el error si es válido
            } else {
                setErrors({ ...errors, portadaFile: validationResult }); // Mostrar el error de validación
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
        document.getElementById("documento").value = ""; // Restablecer el input file a vacío
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

    // Función para manejar el cambio en la descripción
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setFormData({
                ...formData,
                description: value
            });
            setDescriptionWarning(""); // Limpiar el aviso si no se supera el límite
        } else {
            setDescriptionWarning("Has alcanzado el límite de 200 caracteres.");
        }
    };

    // Función para manejar la cancelación general del formulario
    const handleCancel = () => {
        setFormData({
            title: "",
            author: "",
            categoryId: "",
            description: "",
            pdfFile: null,
            portadaFile: null
        });
        setErrors({});
        setDocumentFileName("");
        setCoverFileName("");
        setPreview(null);
        document.getElementById("documento").value = ""; // Restablecer el input file a vacío
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = {};
        setIsLoading(true);
        const updatedData = {};

        // Detectar cambios en los datos del formulario
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== originalData[key]) {
                updatedData[key] = formData[key];
            }
        });

        // Validar archivos si fueron editados
        if (formData.pdfFile && formData.pdfFile !== originalData.pdfFile) {
            updatedData.pdfFile = formData.pdfFile;
        }
        if (formData.portadaFile && formData.portadaFile !== originalData.portadaFile) {
            updatedData.portadaFile = formData.portadaFile;
        }

        // Cancelar si no hay cambios
        if (Object.keys(updatedData).length === 0) {
            setErrors({ general: "No se realizaron cambios en los datos." });
            setIsLoading(false);
            return;
        }

        try {
            const form = new FormData();
            if (updatedData.pdfFile) {
                form.append("pdfFile", updatedData.pdfFile);
            }
            if (updatedData.portadaFile) {
                form.append("portadaFile", updatedData.portadaFile);
            }

            // Subir archivos al servidor
            const uploadResponse = form.has("pdfFile") || form.has("portadaFile")
                ? await uploadFilesToGCS(form)
                : { data: { pdfUrl: null, portadaUrl: null } };

            const { pdfUrl, portadaUrl, audioUrl } = uploadResponse.data;

            // Agregar las URLs de los archivos al objeto actualizado
            if (pdfUrl) updatedData.pdfUrl = pdfUrl;
            if (audioUrl) updatedData.audioUrl = audioUrl; // Asegúrate de manejar esto desde el backend
            if (portadaUrl) updatedData.coverUrl = portadaUrl;

            // Actualizar audiolibro
            const response = await updateAudiobook(id, updatedData);

            // Manejar éxito
            setSuccessMessage("Audiolibro actualizado con éxito.");
            setOriginalData({ ...originalData, ...updatedData });
        } catch (error) {
            console.error("Error al actualizar el audiolibro:", error);
            setErrors({ general: "Error al actualizar el audiolibro. Por favor, inténtelo nuevamente." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-h-screen-xl">
            <BarLoaderWrapper isLoading={isLoading} />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="flex justify-between items-center mb-8">
                    <button

                        onClick={() => setIsModalOpen(true)} // Abre el modal
                        className="mb-4 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Volver al panel de Administración
                    </button>
                    <div className="text-center flex-grow">
                        <span className="text-4xl font-extrabold ">Editar Audiolibro</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-between">
                    <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-6${isLoading ? 'pointer-events-none opacity-50' : ''}">
                        {/* Formulario de texto y selección */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="titulo" className="text-lg font-semibold">
                                    Título<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 text-black border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    placeholder="Título del audiolibro"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title}</p>
                                )}
                                {errors.titleEmpty && (
                                    <p className="text-red-500 text-sm">{errors.titleEmpty}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="autor" className="text-lg font-semibold">
                                    Autor<span className="text-red-500"> *</span>
                                </label>
                                <input
                                    type="text"
                                    id="autor"
                                    name="autor"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full p-3 mt-2 border-2 text-black border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    placeholder="Nombre del Autor"
                                    required
                                />
                                {errors.author && (
                                    <p className="text-red-500 text-sm">{errors.author}</p>
                                )}
                                {errors.authorEmpty && (
                                    <p className="text-red-500 text-sm">{errors.authorEmpty}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="categoria" className="text-lg font-semibold">
                                    Categoría<span className="text-red-500"> *</span>
                                </label>

                                <select
                                    name="categoria"
                                    id="categoria"
                                    value={formData.categoryId} // El valor del select se establece al ID de la categoría
                                    onChange={handleCategoryChange}
                                    className="w-full p-3 mt-2 border-2 text-black border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm">{errors.category}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="descripcion" className="text-lg font-semibold">Descripción<span className="text-red-500"> *</span></label>
                                <textarea
                                    id="descripcion"
                                    name="descripcion"
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B] h-28 resize-none text-black"
                                    placeholder="Descripción del audiolibro"
                                    required
                                ></textarea>
                                {/* Mensaje de advertencia para la descripción */}
                                {descriptionWarning && (
                                    <p className="text-red-500 text-sm">{descriptionWarning}</p>
                                )}
                                {errors.description && (
                                    <p className="text-red-500 text-sm">{errors.description}</p>
                                )}
                                {errors.descriptionEmpty && (
                                    <p className="text-red-500 text-sm">{errors.descriptionEmpty}</p>
                                )}
                            </div>

                            {/* Campo Documento PDF */}
                            <div className="flex flex-col gap-3">
                                <label htmlFor="documento" className="text-lg font-semibold">
                                    Documento PDF<span className="text-red-500"> *</span>
                                </label>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="file"
                                        id="documento"
                                        name="documento"
                                        onChange={handleDocumentoChange}
                                        accept="application/pdf"
                                        className="w-full p-3 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B] cursor-pointer"
                                    />
                                </div>

                                {/* Mostrar el nombre del archivo solo cuando se haya cargado */}
                                {formData.pdfFile && (
                                    <div className="mt-3 text-gray-700 font-semibold">
                                        <span>PDF Cargado: </span>
                                        <span className="text-blue-600">{formData.pdfFile.name || formData.pdfFile}</span>
                                    </div>
                                )}

                                {/* Mensaje de error para PDF */}
                                {errors.pdfFile && (
                                    <p className="text-red-500 text-sm">{errors.pdfFile}</p>
                                )}

                                {/* Texto sobre tamaño máximo de archivo */}
                                <p className="text-gray-400 text-sm">Tamaño máximo del archivo: 50 MB</p>
                            </div>


                            {/* Botones Publicar y Cancelar */}
                            <div className="flex justify-center gap-4 mt-2 ">
                                <button
                                    type="submit"
                                    className="w-1/2 bg-[#0B6477] text-white py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105"
                                >
                                    <FaPaperPlane className="inline-block mr-2 " /> Actualizar
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Columna de Portada */}
                    <div className="w-full sm:w-1/2 flex flex-col items-center justify-start gap-6">
                        <div>
                            <label htmlFor="dropZone" className="text-lg font-semibold">Portada<span className="text-red-500"> *</span></label>
                            <div
                                id="dropZone"
                                className="relative p-10 w-full h-96 border-2 border-[#45DFB1] border-dashed rounded-xl text-center cursor-pointer flex flex-col justify-center items-center "
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <p className="text-sm mb-4">Arrastra y suelta la imagen o selecciona un archivo</p>
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
                                    className="text-white py-2 px-6 rounded-lg bg-[#0B6477] flex items-center justify-center mb-4"
                                    onClick={() => document.getElementById("portadaFile").click()}
                                >
                                    <FaImage className="mr-2" /> Elegir archivo
                                </button>

                                {preview && (
                                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                                        <img
                                            src={preview}
                                            alt="Vista previa"
                                            className="object-cover w-full h-full rounded-lg shadow-lg"
                                        />
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
                    </div>
                </div>



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

                {/* Modal de Confirmación */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                            <p className="text-lg font-semibold text-[#213A57]">¿Está seguro de salir?</p>
                            <div className="mt-4">
                                <button
                                    onClick={handleNavigateHome}
                                    className="bg-[#0B6477] text-white py-2 px-4 rounded-lg hover:bg-[#14919B] mr-2"
                                >
                                    Confirmar
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-500"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Actualizar;