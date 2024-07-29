import React, { useEffect, useState } from "react";

const CharacterManager = ({ onCharacterUpdate }) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        traerPersonajes();
    }, []);

    async function traerPersonajes() {
        const response = await fetch(process.env.BACKEND_URL + "/api/characters", {
            method: "GET"
        });
        const data = await response.json();
        setCharacters(data);
        if (onCharacterUpdate) {
            onCharacterUpdate(data); // Actualiza los personajes en el componente padre
        }
    }

    const agregarAFavoritos = async (characterId) => {
        const userId = localStorage.getItem('user_id'); // Asegúrate de guardar el user_id al iniciar sesión
        const response = await fetch(process.env.BACKEND_URL + "/api/addfavorite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
            },
            body: JSON.stringify({ user_id: userId, character_id: characterId })
        });

        if (response.ok) {
            alert('Personaje añadido a favoritos');
        } else {
            alert('Error al añadir el personaje a favoritos');
        }
    };

    const eliminarPersonaje = async (characterId) => {
        const response = await fetch(process.env.BACKEND_URL + `/api/characters/${characterId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
            }
        });

        if (response.ok) {
            alert('Personaje eliminado');
            // Actualiza la lista de personajes después de eliminar uno
            setCharacters(characters.filter(char => char.id !== characterId));
        } else {
            alert('Error al eliminar el personaje');
        }
    };

    return (
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
                            <button className="btn btn-success" onClick={() => agregarAFavoritos(character.id)}>
                                Añadir a Favoritos
                            </button>
                            <button className="btn btn-danger" onClick={() => eliminarPersonaje(character.id)}>
                                Eliminar Personaje
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CharacterManager;
