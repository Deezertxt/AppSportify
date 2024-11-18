import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams si no lo has hecho
import { getUserById, updateUser } from "../api/api";

const ProfileForm = () => {
  const { id } = useParams();  // Aquí obtienes el ID del usuario desde la URL.
   
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    gender: "",
    biography: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("userId:", id);  // Agrega este log para verificar que el ID es correcto
      setIsLoading(true);
      try {
        const userData = await getUserById(id);  // Llamada con el ID del usuario
        setFormData({
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName,
          gender: userData.gender,
          biography: userData.biography,
        });
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error.response || error);
        setErrorMessage(error.response?.data?.error || "Error al cargar los datos del perfil.");
      } finally {
        setIsLoading(false);
      }
    };
  
    if (id) {
      fetchUserData();
    }
  }, [id]);  // Asegúrate de que el `id` sea una dependencia
   // Dependencia en `id` para recargar los datos cuando cambie

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la acción de guardar
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await updateUser(id, formData); // Asegúrate de pasar el ID en la actualización
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

  // Manejar la acción de cancelar
  const handleCancel = () => {
    console.log("Edición cancelada");
  };

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <div className="bg-teal-700 w-1/4 flex flex-col items-center justify-center p-8">
        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-6xl text-gray-500 mb-4">
          <span className="sr-only">Foto de perfil</span>
        </div>
        <button className="bg-teal-500 text-white py-2 px-4 rounded">Cambiar Foto</button>
      </div>

      {/* Formulario */}
      <div className="bg-white flex-1 p-8">
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
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
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
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Biografía</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              disabled={isLoading}
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
