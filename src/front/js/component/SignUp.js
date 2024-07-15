import React, { useState } from "react";
import "/workspaces/finalproject_aleboigues/src/front/styles/login.css"; // Use the same CSS file

const Signup = () => {
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
            const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });
            const responseData = await response.json();
            if (response.ok) {
                alert("Usuario creado correctamente");
            } else {
                alert("Usuario ya existente");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error en el servidor. Inténtalo de nuevo más tarde.");
        }
    };

    return (
        <div className="login-box">
            <h2>Registro</h2>
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
                        Registrarse
                        <span></span>
                    </a>
                </center>
            </form>
        </div>
    );
};

export default Signup;