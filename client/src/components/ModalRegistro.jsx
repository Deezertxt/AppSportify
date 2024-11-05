import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/authContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errors = { ...formErrors };

    // Validación para el nombre de usuario
    if (name === "username") {
      if (value.trim() === "") {
        errors.username = "El nombre de usuario no puede estar vacío.";
      } else if (!validateTextInput(value)) {
        errors.username = "El nombre de usuario contiene caracteres no permitidos.";
      } else if (value.length < 4) {
        errors.username = "El nombre de usuario debe tener al menos 4 caracteres.";
      } else {
        delete errors.username;
      }
    }

    // Validación para la contraseña
    if (name === "password") {
      if (value.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres.";
      } else {
        const passwordError = validatePassword(value);
        if (passwordError) {
          errors.password = passwordError;
        } else {
          delete errors.password;
        }
      }
    }

    setFormErrors(errors);
  };

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        setPasswordMatchMessage("Las contraseñas coinciden.");
        setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
      } else {
        setPasswordMatchMessage("Las contraseñas no coinciden.");
      }
    } else {
      setPasswordMatchMessage("");
    }
  }, [formData.password, formData.confirmPassword]);

  const validateTextInput = (input) => /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s.,!?()\-:;]*$/.test(input);

  const validatePassword = (password) => {
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!hasNumber.test(password)) {
      return "La contraseña debe contener al menos un número.";
    }
    if (!hasUpperCase.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!hasSpecialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setSuccessMessage("");
    const errors = {};

    // Validación de la contraseña
    if (formData.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        errors.password = passwordError;
      }
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    // Validación del nombre de usuario
    if (!validateTextInput(formData.username)) {
      errors.username = "El nombre de usuario contiene caracteres no permitidos.";
    } else if (formData.username.trim() === "") {
      errors.usernameEmpty = "El nombre de usuario no puede estar vacío.";
    } else if (formData.username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signUp(formData.email, formData.password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username: formData.username,
        email: formData.email,
      });
      setSuccessMessage("Registro exitoso!");
      setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error al registrar:", error);
      setFormErrors({ general: error.message || "Error al registrar. Verifique los campos." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await loginWithGoogle();
      const user = result.user;

      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, { username: user.displayName, email: user.email }, { merge: true });

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
          className="absolute top-5 right-2 text-gray-500"
        >
          X
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
            onChange={handleChange}
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
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
        </div>

        <div className="mb-2 relative">
          <label className="block text-white font-semibold mb-1 text-xs">
            Contraseña<span className="text-red-500"> *</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="**"
            value={formData.password}
            onChange={handleChange}
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
            placeholder="**"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-1 border-b-2 border-white bg-transparent focus:outline-none text-white text-sm"
            required
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="text-white" />
          </button>
          {formErrors.confirmPassword && <p className="text-red-500 text-xs">{formErrors.confirmPassword}</p>}
          {passwordMatchMessage && <p className="text-green-500 text-xs">{passwordMatchMessage}</p>}
        </div>

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

        <p className="text-white text-xs mt-4 text-center">
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={openLogin} className="text-blue-500 underline  ">
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
