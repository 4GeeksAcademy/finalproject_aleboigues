import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../component/SearchBar"; 
import CharacterManager from "../component/characterManager"; // Importamos el nuevo componente

const Characters = () => {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        }
    }, [navigate]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
            <SearchBar onSearch={handleSearch} />
            <CharacterManager onCharacterUpdate={(characters) => {
                const filtered = characters.filter(character =>
                    character.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                setFilteredCharacters(filtered);
            }} />
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
