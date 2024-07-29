// src/front/js/pages/Characters.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar"; 
import CharacterManager from "../component/characterManager"; // Asegúrate de que la ruta sea correcta

const Characters = () => {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [characters, setCharacters] = useState([]); // Nuevo estado para almacenar todos los personajes
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        } else {
            fetchCharacters(); // Carga los personajes al inicio
        }
    }, [navigate]);

    const fetchCharacters = async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/characters");
        const data = await response.json();
        setCharacters(data);
        setFilteredCharacters(data); // Inicialmente, todos los personajes son filtrados
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const handleCharacterUpdate = (updatedCharacters) => {
        setCharacters(updatedCharacters);
        const filtered = updatedCharacters.filter(character =>
            character.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
            <SearchBar onSearch={handleSearch} />
            <CharacterManager onCharacterUpdate={handleCharacterUpdate} /> {/* Integración del CharacterManager */}
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
