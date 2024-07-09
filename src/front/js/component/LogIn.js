import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();
      
      if (response.ok) {
        alert("Inicio de sesión exitoso");
      } else {
        alert("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en el servidor. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                Iniciar sesión
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
