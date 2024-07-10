import React from "react";

const MainPage = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="display-4">Bienvenido al Universo de Rick y Morty</h1>
                    <p className="lead mt-4">
                        Sumérgete
                        en el increíble y caótico universo de Rick y Morty. Aquí encontrarás
                        información detallada sobre todos los personajes de la serie.
                    </p>
                    <p className="mt-4">
                        Por
                        favor, regístrate o inicia sesión para acceder a la lista completa de
                        personajes y descubrir más sobre sus aventuras interdimensionales.
                    </p>
                    <div className="mt-5">
                        <img
                            src="https://via.placeholder.com/600x300"
                            alt="Rick and Morty Banner"
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;