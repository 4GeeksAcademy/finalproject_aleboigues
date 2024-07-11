import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    // Verifica la autenticación del usuario
    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        } else {
            ejecutarApiExterna();
            traerPersonajes();
        }
    }, [navigate]);

    // Función para llamar a la API externa
    async function ejecutarApiExterna() {
        const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/apiexterna", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" } 
        });
        const data = await response.json();
        // Manejar la respuesta si es necesario
    };

    // Función para traer los personajes
    async function traerPersonajes() {
        const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/characters", { 
            method: "GET" 
        });
        const data = await response.json();
        setCharacters(data);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
            <div className="row">
                {characters.map((character, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={character.image} className="card-img-top" alt={character.name} />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">Especie: {character.species}</p>
                                <p className="card-text">Estado: {character.status}</p>
                                <p className="card-text">Género: {character.gender}</p>
                                <button className="btn btn-success">Añadir a Favoritos</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
