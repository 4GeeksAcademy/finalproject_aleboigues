import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "/workspaces/finalproject_aleboigues/src/front/styles/login.css"; // Ensure you have the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/character");
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { email, password };

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("token", responseData.access_token);
        setIsAuthenticated(true);
        navigate("/character");
      } else {
        alert("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el servidor. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="login-box">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>Correo electrónico</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label>Contraseña</label>
        </div>
        <center>
          <a href="#" onClick={handleSubmit}>
            Iniciar sesión
          </a>
        </center>
      </form>
    </div>
  );
};

export default Login;