import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      setErrorMessage("");
      // Aquí puedes manejar el envío del formulario
      console.log("Contraseñas válidas:", password);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center p-4">
      <div className="bg-[#ABDADC] w-full max-w-xl p-8 space-y-4 shadow-md rounded-lg">
        <div className="flex flex-col items-center">
          <img src="./logoS.svg" alt="Sportify logo" className="w-37 mb-4" />
          <h2 className="text-2xl font-bold text-white text-center mb-6">RESTABLECER CONTRASEÑA</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="text-white text-lg font-semibold block mb-2 ">Ingrese su nueva contraseña</label>
            <input
              placeholder="*********"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
              required
            />
            <button
              type="button"
              className="absolute right-6 py-5"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-black" />
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="text-white text-lg font-semibold block mb-2">Confirmar contraseña</label>
            <input
              placeholder="*********"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-3 mt-2 border-2 border-[#45DFB1] rounded-lg focus:ring-2 focus:ring-[#14919B]"
              required
            />
            <button
              type="button"
              className="absolute right-6 py-5"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="text-black" />
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <div className="px-14 items-center justify-center">
            <button
              type="submit"
              className="w-full bg-[#0B6477] text-white py-3 rounded-lg hover:bg-[#14919B] transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
