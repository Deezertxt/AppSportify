import React, { useState } from 'react';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    gender: '',
    biography: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Lógica para guardar los datos
    console.log("Datos guardados:", formData);
  };

  const handleCancel = () => {
    // Lógica para cancelar la acción o restablecer el formulario
    console.log("Cancelado");
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
      <div className="bg-gray-100 flex-1 p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Personalizar Perfil</h2>

        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre Completo *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Nombre Completo"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Género *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              required
            >
              <option value="">Selecciona tu género</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Biografía *</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Escribe tu biografía"
              rows="4"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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