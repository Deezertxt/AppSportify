import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/authContext";
import { FiXCircle } from "react-icons/fi";
import { registerUser } from "../api/api";

const RegistrationForm = ({ closeModal, openLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { signUp, loginWithGoogle } = useAuth();
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, username: value }));
  
    const errors = { ...formErrors };
  
    // Validaciones de nombre de usuario
    if (value.trim() === "") {
      errors.username = "El nombre de usuario no puede estar vacío.";
    } else if (!validateTextInput(value)) {
      errors.username = "El nombre de usuario contiene caracteres no permitidos.";
    } else if (value.length < 4) {
      errors.username = "El nombre de usuario debe tener al menos 4 caracteres.";
    } else {
      delete errors.username; // Eliminar el error si el nombre de usuario es válido
    }
  
    setFormErrors(errors);
  };
  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));
  
    const errors = { ...formErrors };
  
    // Validaciones de correo electrónico
    if (value.trim() === "") {
      errors.email = "El correo electrónico no puede estar vacío.";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errors.email = "Ingrese un correo electrónico válido.";
    } else {
      delete errors.email; // Eliminar el error si el correo electrónico es válido
    }
  
    setFormErrors(errors);
  };
  
  // Función de validación de caracteres para nombre de usuario

  const validateTextInput = (input) => /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()\-:;]*$/.test(input);
  

  const handlePasswordChange = (e) => {
  let value = e.target.value;
  // Limitar la longitud a 12 caracteres
  if (value.length > 12) {
    value = value.slice(0, 12);
  }
  
  setFormData((prev) => ({ ...prev, password: value }));
  const errors = { ...formErrors };

  // Validacionelans de contraseña
  if (value.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  } else if (!/[A-Z]/.test(value)) {
    errors.password = "La contraseña debe tener al menos una letra mayúscula.";
  } else if (!/\d/.test(value)) {
    errors.password = "La contraseña debe contener al menos un número.";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    errors.password = "La contraseña debe contener al menos un carácter especial.";
  } else {
    delete errors.password;
  }

  setFormErrors(errors);
};
  const handleConfirmPasswordChange = (e) => {
    let value = e.target.value;
    // Limitar la longitud a 12 caracteres
    if (value.length > 12) {
      value = value.slice(0, 12);
    }
  
    setFormData((prev) => ({ ...prev, confirmPassword: value }));
    
    // Actualizar el mensaje de coincidencia de contraseña
    if (formData.password === value) {
      setPasswordMatchMessage("Las contraseñas coinciden.");
      setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
    } else {
      setPasswordMatchMessage("Las contraseñas no coinciden.");
      setFormErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden." }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");
    const errors = {};
  
    // Validaciones de nombre de usuario
    if (!validateTextInput(formData.username)) {
      errors.username = "El nombre de usuario contiene caracteres no permitidos.";
    } else if (formData.username.trim() === "") {
      errors.username = "El nombre de usuario no puede estar vacío.";
    } else if (formData.username.length < 4) {
      errors.username = "El nombre de usuario debe tener al menos 4 caracteres.";
    }
  
    // Validaciones de correo electrónico
    if (formData.email.trim() === "") {
      errors.email = "El correo electrónico no puede estar vacío.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Ingrese un correo electrónico válido.";
    }
  
    // Validaciones de la contraseña
    if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "La contraseña debe tener al menos una letra mayúscula.";
    } else if (!/\d/.test(formData.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "La contraseña debe contener al menos un carácter especial.";
    }
  
    // Validaciones de confirmación de la contraseña
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }
  
    // Si hay errores, no se envía el formulario
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    setIsLoading(true);
    try {
      const userCredential = await signUp(formData.email, formData.password);
      const user = userCredential.user;
     
      await registerUser({
        firebaseUserId: user.uid,
        username: formData.username,
        email: formData.email
      });

      setSuccessMessage("Registro exitoso!");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setFormErrors({ email: "El correo electrónico ya está registrado. Intenta con otro." });
      } else {
        setFormErrors({ general: error.message || "Error al registrar. Verifique los campos." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/libros");
    } catch (error) {
      setFormErrors({ general: "Error al iniciar sesión con Google: " + error.message });
    }
  };

  return (
    <div className="p-2 max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 m-4 right-2 text-gray-500"
        >
         <FiXCircle className="text-white"/>
        </button>

        <div className="flex flex-col items-center mb-4">
          <img src="logoS.svg" alt="Sportify logo" className="w-16 mb-2" />
        </div>

        <h2 className="text-lg font-bold text-white text-left mb-3">Regístrate</h2>

        {formErrors.general && <p className="text-red-500 text-xs">{formErrors.general}</p>}
        {successMessage && <p className="text-green-500 text-xs">{successMessage}</p>}

        <div className="mb-2">
          <label className="block font-semibold text-white mb-1 text-xs">
            Nombre de usuario<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="username"
            maxLength={10}
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleUsernameChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
          {formErrors.username && <p className="text-red-500 text-xs">{formErrors.username}</p>}
        </div>

        <div className="mb-2">
          <label className="block font-semibold text-white mb-1 text-xs">
            Correo electrónico<span className="text-red-500"> *</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleEmailChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
        </div>
        {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}

        <div className="mb-2 relative">
          <label className="block text-white font-semibold mb-1 text-xs">
            Contraseña<span className="text-red-500"> *</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="*****"
            value={formData.password}
            onChange={handlePasswordChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
          {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
        </div>

        <div className="mb-2 relative">
          <label className="block text-white font-semibold mb-1 text-xs">
            Confirmar contraseña<span className="text-red-500"> *</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="*****"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
           {passwordMatchMessage && (
                <p className={`text-xs ${formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
          {passwordMatchMessage}
                </p>
           )}
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          className={`w-full p-2 bg-gray-800 text-white rounded mt-3 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Registrar"}
        </button>

        <div className="flex items-center my-3">
          <hr className="flex-grow border-white" />
          <span className="mx-2 text-white">O</span>
          <hr className="flex-grow border-white" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignin}
          className="flex items-center justify-center w-full p-2 bg-blue-600 text-white rounded"
        >
          <img src="google.svg" alt="Google icon" className="w-4 h-4 mr-2" />
          Inicia sesión con Google
        </button>

        <div className="text-white text-center leading-none">
  <p className="text-sm">
    ¿Ya tienes cuenta?{" "}
    <button type="button" onClick={openLogin} className="text-blue-500 font-bold">
      Inicia sesión
    </button>
  </p>
  <p className="text-[10px]">
  ¿Aceptas las normas y políticas de?{" "}
  <button type="button" onClick={openLogin} className="text-blue-500 font-bold text-[10px]">
    ese servicio
  </button>
</p>
</div>
      </form>
    </div>
  );
};

export default RegistrationForm;