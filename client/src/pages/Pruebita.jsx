import { useState } from "react";
import { register } from "../api/api";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");

    // Aquí puedes agregar la lógica de validación

    setIsLoading(true);
    try {
      const response = await register(formData);
      console.log("Registro exitoso", response);
      setSuccessMessage("Registro exitoso!");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error al registrar:", error);
      setFormErrors({ general: "Error al registrar. Verifique los campos." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Regístrate</h2>
        
        {/* Campos de entrada */}
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border-b-2 mb-4"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border-b-2 mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border-b-2 mb-4"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border-b-2 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>

        {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
        {formErrors.general && <p className="text-red-500 text-center mt-4">{formErrors.general}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;
