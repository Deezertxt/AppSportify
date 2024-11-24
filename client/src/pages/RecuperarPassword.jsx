import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";

const ResetPassword = ({ openLoginModal }) => { // Recibir openLoginModal como prop
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(true); // Para controlar si el enlace es válido
  const [loading, setLoading] = useState(true); // Para mostrar un estado de carga mientras verificamos el enlace
  const [oobCode, setOobCode] = useState(""); // Código de recuperación

  const { changePassword } = useAuth();
  const navigate = useNavigate(); // Para redirigir al login después de cambiar la contraseña

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password) return "";
    return strongPasswordRegex.test(password)
      ? "Contraseña válida"
      : "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(validatePassword(newPassword));
  };

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); 
    const code = params.get("oobCode");

    if (code) {
      setOobCode(code);
      const auth = getAuth();
      verifyPasswordResetCode(auth, code)
        .then(() => {
          setIsLinkValid(true);
          setLoading(false);
        })
        .catch(() => {
          setIsLinkValid(false);
          setLoading(false);
        });
    } else {
      setIsLinkValid(false);
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }
    if (!password || passwordStrength !== "Contraseña válida") {
      setErrorMessage("Por favor, ingresa una contraseña válida.");
      return;
    }

    const result = await changePassword(password, oobCode);

    if (result.success) {
      alert("Contraseña cambiada correctamente");
      openLoginModal(); // Abre el modal de inicio de sesión
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4 bg-gradient-to-r from-[#023047] to-[#8ECAE6]">
      <div className="bg-gray-800 w-full max-w-lg p-8 space-y-6 shadow-xl rounded-lg">
        {/* Resto del contenido */}
        <button
          type="submit"
          className="w-full bg-[#219EBC] text-white font-semibold py-3 rounded-lg hover:bg-[#028090] hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
