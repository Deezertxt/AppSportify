import React, { useState } from 'react';
import './Login.css'; // Asegúrate de crear este archivo para agregar estilos

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el inicio de sesión
    console.log('Iniciar sesión con:', { email, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Correo electrónico o número de teléfono"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
        <div className="forgot-password">
          <a href="/forgot-password">¿Has olvidado la contraseña?</a>
        </div>
      </form>
      <button className="create-account-button">
        Crear cuenta nueva
      </button>
    </div>
  );
}

export default Login;
