import React, { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const token = localStorage.getItem('token');  // Asegúrate de obtener el token JWT almacenado

    useEffect(() => {
        const fetchCharacters = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/characters`);
            const data = await response.json();
            setCharacters(data);
        };

        fetchCharacters();
    }, []);

    return (
        <div className="container">
            <h1>Personajes</h1>
            <div className="row">
                {characters.map(character => (
                    <div key={character.id} className="col-lg-4 col-md-6 mb-4">
                        <CharacterCard character={character} token={token} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharactersList;
