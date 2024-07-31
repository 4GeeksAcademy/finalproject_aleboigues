import React from "react";
import { useNavigate } from "react-router-dom";
import "/workspaces/finalproject_aleboigues/src/front/styles/mainpage.css"; 

const MainPage = () => {
    const navigate = useNavigate();

    const goToCharacters = () => {
        navigate('/character');
    };

    return (
        <div className="main-page">
            <video autoPlay loop muted className="video-bg">
                <source src="/workspaces/finalproject_aleboigues/public/videos/Vortex_.mp4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
            </video>

            <div className="container mt-5 text-center text-white">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="display-4">Bienvenido al Universo de Rick y Morty</h1>
                        <p className="lead mt-4">
                            Sumérgete en el increíble y caótico universo de Rick y Morty. Aquí encontrarás información detallada sobre todos los personajes de la serie.
                        </p>
                        <p className="mt-4">
                            Por favor, regístrate o inicia sesión para acceder a la lista completa de personajes y descubrir más sobre sus aventuras interdimensionales.
                        </p>
                        <button className="btn btn-primary mt-4" onClick={goToCharacters}>
                            Ver Personajes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
