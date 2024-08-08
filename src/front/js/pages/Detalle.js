import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "/workspaces/finalproject_aleboigues/src/front/styles/detalle.css";

const Detalle = () => {
    const { detalle} = useParams(); 
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/characters/" + detalle); 
                if (!response.ok) throw new Error('Error al cargar el personaje');
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchCharacter();
    }, [detalle]);

    if (error) {
        return (
            <div>
                <h2>Error: {error}</h2>
            </div>
        );
    }

    if (!character) {
        return (
            <div>
                <h2>Cargando...</h2>
            </div>
        );
    }

    return (
        <div className='card'>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
            <p>Especie: {character.species}</p>
            <p>Estado: {character.status}</p>
            <p>Género: {character.gender}</p>
        </div>
    );
};

export default Detalle;