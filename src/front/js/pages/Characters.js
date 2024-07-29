// src/front/js/pages/Characters.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar"; // Asegúrate de importar tu componente SearchBar

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // Estado para manejar la búsqueda
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        } else {
            ejecutarApiExterna();
            traerPersonajes();
        }
    }, [navigate]);

    async function ejecutarApiExterna() {
        const response = await fetch(process.env.BACKEND_URL + "/api/apiexterna", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" } 
        });
        const data = await response.json();
        // Manejar la respuesta si es necesario
    };

    async function traerPersonajes() {
        const response = await fetch(process.env.BACKEND_URL + "/api/characters", { 
            method: "GET" 
        });
        const data = await response.json();
        setCharacters(data);
    };

    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
            <SearchBar onSearch={handleSearch} /> {/* Aquí pasamos la función de búsqueda */}
            <div className="row">
                {filteredCharacters.map((character, index) => (
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
