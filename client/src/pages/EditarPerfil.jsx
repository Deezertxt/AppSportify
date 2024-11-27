import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { getUserById, updateUser } from "../api/api";
import Breadcrumb from "../components/Breadcrumb";
import { FiUser, FiCamera, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ModalReu from "../components/modals/ModalReu";
import ConfirmCancelModal from "../components/modals/ConfirmCancelModal";

const EditarPerfil = () => {
    const { user } = useAuth();
    const userId = user.userId;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        fullName: "",
        gender: "",
        biography: "",
        profilePicUrl: "", // Aquí se guardará la cadena base64
    });

    const [isLoading, setIsLoading] = useState(false);
    const [validationMessages, setValidationMessages] = useState({
        profilePic: "",
        fullName: "",
        username: "",
    });

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // "success" o "error"
    const [showModal, setShowModal] = useState(false);
    const showAlertMessage = (title, message, type) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalType(type); // Define el tipo: "success" o "error"
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000); // Cerrar el modal después de 2 segundos
    };


    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await getUserById(userId);
                const userData = response.data;
                setFormData({
                    username: userData.username || "",
                    email: userData.email || "",
                    fullName: userData.fullName || "",
                    gender: userData.gender || "",
                    biography: userData.bio || "",
                    profilePicUrl: userData.profilePicUrl || "", // Aquí cargamos la cadena base64 si está disponible
                });
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setErrorMessage("Error al cargar los datos.");
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) fetchUserData();
    }, [userId]);

    // Manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "fullName") validateFullName(value);
        if (name === "username") validateUsername(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Restablecer mensajes de validación previos
        setValidationMessages((prev) => ({ ...prev, profilePic: "" }));

        if (!validateProfilePic(file)) {
            // Si la validación falla, limpiar el input de archivo
            e.target.value = null;
            return;
        }

        // Leer el archivo y actualizar el estado
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, profilePicUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const validateProfilePic = (file) => {
        if (!file) {
            setValidationMessages((prev) => ({
                ...prev,
                profilePic: "Debe subir una imagen.",
            }));
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            setValidationMessages((prev) => ({
                ...prev,
                profilePic: "El tamaño debe ser menor a 5 MB.",
            }));
            return false;
        }

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            setValidationMessages((prev) => ({
                ...prev,
                profilePic: "Formato no válido. Solo se permite JPG, PNG o WEBP.",
            }));
            return false;
        }

        // Validar dimensiones de la imagen
        return new Promise((resolve) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width < 200 || img.height < 200) {
                    setValidationMessages((prev) => ({
                        ...prev,
                        profilePic: "La imagen debe ser al menos 200x200 píxeles.",
                    }));
                    resolve(false);
                } else {
                    setValidationMessages((prev) => ({
                        ...prev,
                        profilePic: "Foto de perfil válida.",
                    }));
                    resolve(true);
                }
            };
            img.onerror = () => {
                setValidationMessages((prev) => ({
                    ...prev,
                    profilePic: "No se pudo cargar la imagen. Intente con otro archivo.",
                }));
                resolve(false);
            };
        });
    };

    const handleRemoveProfilePic = () => {
        setFormData((prev) => ({ ...prev, profilePicUrl: "/user.webp" })); // URL predeterminada
        setValidationMessages((prev) => ({ ...prev, profilePic: "" }));
        document.getElementById("upload-profile-pic").value = ""; // Limpiar el input de archivo
    };

    const validateFullName = (name) => {
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            setValidationMessages((prev) => ({
                ...prev,
                fullName: "Solo se permiten caracteres alfabéticos.",
            }));
            return false;
        }
        setValidationMessages((prev) => ({ ...prev, fullName: "" }));
        return true;
    };

    const validateUsername = (username) => {
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            setValidationMessages((prev) => ({
                ...prev,
                username: "Solo se permiten caracteres alfanuméricos.",
            }));
            return false;
        }
        setValidationMessages((prev) => ({ ...prev, username: "" }));
        return true;
    };


    // Guardar los cambios del perfil
    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validaciones previas
        const errors = {};

        // Validación de nombre completo
        if (!formData.fullName || !/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            errors.fullName = "El nombre completo solo debe contener caracteres alfabéticos.";
        }

        // Validación de nombre de usuario
        if (!formData.username || !/^[a-zA-Z0-9]+$/.test(formData.username)) {
            errors.username = "El nombre de usuario solo debe contener caracteres alfanuméricos.";
        }

        // Validación de biografía
        if (formData.biography && formData.biography.length > 180) {
            errors.biography = "La biografía no puede superar los 180 caracteres.";
        }

        // Validación de la foto de perfil solo si no es la predeterminada
        if (formData.profilePicUrl !== "/user.webp") {
            if (!formData.profilePicUrl) {
                errors.profilePic = "Debe subir una foto de perfil válida.";
            } else if (validationMessages.profilePic && validationMessages.profilePic.startsWith("Formato no válido")) {
                errors.profilePic = "El formato de la imagen no es válido.";
            } else if (validationMessages.profilePic && validationMessages.profilePic.startsWith("La imagen debe ser al menos")) {
                errors.profilePic = "La resolución de la imagen es insuficiente.";
            }
        }

        // Si hay errores, mostrar mensajes y detener el guardado
        if (Object.keys(errors).length > 0) {
            setValidationMessages(errors);
            setIsLoading(false);
            return;
        }

        const payload = {
            name: formData.username,
            bio: formData.biography,
            profilePicUrl: formData.profilePicUrl,
            language: formData.language || "Español",
            gender: formData.gender,
            fullName: formData.fullName,
        };

        try {
            const response = await updateUser(userId, payload);
            if (response.status === 200) {
                showAlertMessage(
                    "Éxito",
                    "Perfil actualizado exitosamente.",
                    "success"
                );
                setTimeout(() => navigate(`/perfil/${userId}`), 2000); // Redirige después de 2 segundos
            } else {
                showAlertMessage(
                    "Error",
                    "No se pudo actualizar el perfil.",
                    "error"
                );
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            showAlertMessage(
                "Error",
                "Ocurrió un error al guardar los datos.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(`/perfil/${userId}`);
    };
    const handleCancelButtonClick = () => {
        setShowCancelModal(true); // Muestra el modal de confirmación al presionar "Cancelar"
    };


    return (
        <div className="min-h-screen flex justify-center">
            <div className="max-w-4xl w-full shadow-lg rounded-lg overflow-hidden mt-8 p-8">
                <Breadcrumb />
                <h2 className="text-3xl font-semibold text-center mb-6">Editar Perfil</h2>

                {isLoading && (
                    <div className="flex justify-center">
                        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-teal-600 rounded-full"></div>
                    </div>
                )}

                <form onSubmit={handleSave}>
                    {/* Imagen de perfil */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            {/* Contenedor de la imagen de perfil */}
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-600 shadow-md">
                                {formData.profilePicUrl ? (
                                    <img
                                        src={formData.profilePicUrl || "/user.webp"}
                                        alt="Foto de perfil"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-teal-600 text-4xl">
                                        <FiUser />
                                    </div>
                                )}
                            </div>

                            {/* Botón de subir imagen */}
                            <label
                                htmlFor="upload-profile-pic"
                                className="absolute bottom-2 right-2 bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-full shadow-md cursor-pointer flex items-center justify-center"
                                title="Subir nueva foto"
                            >
                                <FiCamera className="text-lg" />
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="upload-profile-pic"
                            />

                            {/* Botón de eliminar imagen */}
                            <button
                                type="button"
                                onClick={handleRemoveProfilePic}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md flex items-center justify-center"
                                title="Eliminar foto"
                            >
                                <FiTrash className="text-lg" />
                            </button>
                        </div>

                        {/* Mensajes de validación */}
                        {validationMessages.profilePic && (
                            <p className="text-sm text-teal-500 mt-3">{validationMessages.profilePic}</p>
                        )}
                    </div>


                    {/* Nombre de Usuario */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Nombre de Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full border-2 text-black border-teal-500 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Nombre de Usuario"
                            pattern="^[a-zA-Z0-9_]+$"
                            required
                        />
                        {validationMessages.username && (
                            <p className="text-sm text-red-500 mt-2">{validationMessages.username}</p>
                        )}
                    </div>

                    {/* Correo Electrónico */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            readOnly
                            className="w-full border-2 text-black border-teal-500 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
                            placeholder="Correo Electrónico"
                        />
                    </div>

                    {/* Nombre Completo */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Nombre Completo</label>
                        <input
                            type="text"
                            name="fullName"
                            maxLength={70}
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full border-2 text-black border-teal-500 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            placeholder="Nombre Completo"
                            pattern="^[A-Za-z\s]+$"
                            required
                        />
                        {validationMessages.fullName && (
                            <p className="text-sm text-red-500 mt-2">{validationMessages.fullName}</p>
                        )}
                    </div>

                    {/* Género */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Género</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            placeholder="Género"
                            className="w-full border-2 text-black border-teal-500 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    {/* Biografía */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2">Biografía</label>
                        <textarea
                            name="biography"
                            maxLength="180"
                            value={formData.biography}
                            onChange={handleInputChange}
                            className="w-full border-2 text-black border-teal-500 p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                            placeholder="Escribe algo sobre ti"
                            rows="2"
                            required
                        />
                        <p className="text-sm text-gray-400">Máximo 180 caracteres.</p>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={handleCancelButtonClick}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>

            <ConfirmCancelModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)} // Cierra el modal si el usuario cancela
                onConfirm={handleCancel} // Navega al perfil si el usuario confirma
                title="¿Cancelar cambios?"
                message="Si cancelas, los cambios realizados no se guardarán. ¿Estás seguro?"
                confirmText="Sí, cancelar"
                cancelText="No, volver"
            />

            {/* Modal de éxito/error */}
            {showModal && (
                <ModalReu
                    isSuccess={modalType === "success"}
                    message={modalMessage}
                    onClose={() => setShowModal(false)} // Para cerrar manualmente si es necesario
                />
            )}


        </div>
    );
};

export default EditarPerfil;
