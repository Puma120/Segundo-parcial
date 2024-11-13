import React, { useState } from "react";
import { loginUser } from "../services/auth";

export const LoginForm = ({ setIsAuthenticated, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, role, error } = await loginUser(email, password);

    if (user) {
      setIsAuthenticated(true);
      setRole(role); // Actualiza el rol en el estado de la app
    }

    if (error) {
      setError(error);
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-box">
        <div>
          <h2>Iniciar sesión</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              required
              className="input-field"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              required
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
