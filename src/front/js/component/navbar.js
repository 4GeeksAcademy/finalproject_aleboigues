import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/rick-and-morty-31015.png"; 
import "/workspaces/finalproject_aleboigues/src/front/styles/styles.css";

export const Navbar = () => {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        alert("Has cerrado sesión exitosamente");
        navigate("/home");
    }

    // Verifica si el usuario está autenticado
    const isAuthenticated = localStorage.getItem('token') || sessionStorage.getItem('token');

    return (
        <nav className="navbar navbar-expand custom-navbar-bg">
            <div className="container">
                <Link to="/">
                    <img src={logo} width="100" alt="Rick and Morty Logo" />
                </Link>
                <div className="ml-auto">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-primary m-2">Sign Up</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary  m-2">Log In</button>
                            </Link>
                        </>
                    ) : (
                        <button onClick={logout} className="btn btn-primary">Log Out</button>
                    )}
                </div>
            </div>
        </nav>
    );
};
