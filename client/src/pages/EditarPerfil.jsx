import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../api/api";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom"; 

const ProfileForm = () => {
  const { user } = useAuth();
  const userId = user?.userId;
  const navigate = useNavigate();

  const defaultProfileImage = "/pfp.svg";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    gender: "",
    biography: "",
    profileImage: null, // Para la imagen de perfil
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [fullNameError, setFullNameError] = useState(null);
  const [biographyError, setBiographyError] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [imagePreview, setImagePreview] = useState(null); // Para la vista previa de la imagen

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await getUserById(userId);
        const userData = response.data;
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          fullName: userData.fullName || "",
          gender: userData.gender || "",
          biography: userData.biography || "",
          profileImage: userData.profileImage || null, // Cargar la imagen si ya existe
        });

        if(!userData.profileImage){
            setImagePreview(defaultProfileImage);
        } else {
            setImagePreview(userData.profileImage);
        }

      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        setErrorMessage(error.response?.data?.error || "Error al cargar los datos del perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validación para el nombre de usuario (solo caracteres alfanuméricos)
    if (name === "username") {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      if (!alphanumericRegex.test(value)) {
        setUsernameError("El nombre de usuario solo puede contener caracteres alfanuméricos.");
      } else {
        setUsernameError(null);
      }
    }

    // Validación para el nombre completo (solo letras y espacios)
    if (name === "fullName") {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(value)) {
        setFullNameError("El nombre completo solo puede contener letras y espacios.");
      } else {
        setFullNameError(null);
      }
    }

    if (name === "biography") {
      if (value.length > 210) {
        setBiographyError("La biografía no puede exceder los 210 caracteres.");
      } else {
        setBiographyError(null);  
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Verificar tamaño y formato de la imagen
      const validFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!validFormats.includes(file.type)) {
        setErrorMessage("El formato de la imagen no es válido. Suba una imagen en formato .jpg, .jpeg, .png y .webp.");
        return;
      }
  
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("La imagen no debe exceder los 5 MB.");
        return;
      }
  
      // Verificar las dimensiones mínimas de la imagen
      const img = new Image();
      img.onload = () => {
        // Si la imagen tiene dimensiones menores que 200x200, no se permite
        if (img.width < 200 || img.height < 200) {
          setErrorMessage("La imagen debe tener al menos 200x200 píxeles.");
          return;
        }
  
        // Si la imagen excede las dimensiones máximas, ajustarla
        const maxWidth = 1000;
        const maxHeight = 1000;
  
        let newWidth = img.width;
        let newHeight = img.height;
  
        if (newWidth > maxWidth || newHeight > maxHeight) {
          const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight); // Encontramos el ratio más pequeño
          newWidth = newWidth * ratio;  // Ajustamos el ancho
          newHeight = newHeight * ratio;  // Ajustamos la altura
        }
  
        // Crear un canvas para redimensionar la imagen manteniendo la relación de aspecto
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
        // Convertir la imagen redimensionada a base64 y actualizar la vista previa
        const resizedImage = canvas.toDataURL(file.type);
        setImagePreview(resizedImage);
        setFormData({ ...formData, profileImage: resizedImage });
      };
      img.src = URL.createObjectURL(file);
    }
  };
  
  
  

  const handleRemoveImage = () => {
    setImagePreview(defaultProfileImage);  
    setFormData({ ...formData, profileImage: null });  
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (usernameError || fullNameError || biographyError) {
      setErrorMessage("Corrige los errores antes de guardar.");
      return;
    }
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await updateUser(userId, formData);
      if (response.status === 200) {
        setSuccessMessage("Perfil actualizado con éxito.");
      } else {
        setErrorMessage("No se pudo actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setErrorMessage("Ocurrió un error al guardar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalAccept = () => {
    setIsModalVisible(false);
    navigate(-1);
  };

  return (                          
    <div className="flex h-1/2">
      <div className=" w-1/4 flex flex-col items-center justify-center p-8">
        <div className="w-32 h-32   rounded-full flex items-center justify-center text-6xl text-gray-500 mb-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Vista previa" className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="sr-only">Foto de perfil</span>
          )}
        </div>
        <label className="bg-teal-500 text-white py-2 px-1 rounded cursor-pointer "> Cambiar Imagen
          <input
            type="file"  
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>
        
        {imagePreview && (
          <button
            onClick={handleRemoveImage}
            className="bg-red-500 text-white py-2 px-4 rounded mt-2"
          >
            Eliminar Imagen
          </button>
        )}
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
        {isLoading && <p className="text-blue-500">Cargando datos...</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-medium mb-2">Nombre de Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            />
            {usernameError && <p className="text-red-500">{usernameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            />
            {fullNameError && <p className="text-red-500">{fullNameError}</p>}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Género</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="">Seleccione</option>
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Female">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Biografía</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
              maxLength="210"
            />
            {biographyError && <p className="text-red-500">{biographyError}</p>}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <p>¿Estás seguro de que deseas cancelar los cambios?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleModalCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                No
              </button>
              <button
                onClick={handleModalAccept}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
