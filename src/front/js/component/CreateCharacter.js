import React, { useEffect, useState } from "react";

const CharacterManager = ({ onCharacterUpdate }) => {
    const [characters, setCharacters] = useState([]);
    const [editingCharacter, setEditingCharacter] = useState(null);
    const [characterForm, setCharacterForm] = useState({
        name: '',
        image: '',
        species: '',
        status: '',
        gender: ''
    });

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
            const errorData = await response.json();
            alert(`Error al eliminar el personaje: ${errorData.error || 'Error desconocido'}`);
        }
    };

    const manejarEdicion = (character) => {
        setEditingCharacter(character);
        setCharacterForm({
            name: character.name,
            image: character.image,
            species: character.species,
            status: character.status,
            gender: character.gender
        });
    };

    const manejarActualizacion = async (e) => {
        e.preventDefault();
        const response = await fetch(process.env.BACKEND_URL + `/api/characters/${editingCharacter.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(characterForm)
        });

        if (response.ok) {
            alert('Personaje actualizado');
            const updatedCharacter = await response.json();
            setCharacters(characters.map(char => (char.id === updatedCharacter.id ? updatedCharacter : char)));
            setEditingCharacter(null); // Limpiar la edición
            setCharacterForm({
                name: '',
                image: '',
                species: '',
                status: '',
                gender: ''
            });
        } else {
            const errorData = await response.json();
            alert(`Error al actualizar el personaje: ${errorData.error || 'Error desconocido'}`);
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
                            <button className="btn btn-warning" onClick={() => manejarEdicion(character)}>
                                Editar Personaje
                            </button>
                            <button className="btn btn-danger" onClick={() => eliminarPersonaje(character.id)}>
                                Eliminar Personaje
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {editingCharacter && (
                <div className="col-12 mt-4">
                    <h3>Editar Personaje</h3>
                    <form onSubmit={manejarActualizacion}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={characterForm.name} onChange={(e) => setCharacterForm({ ...characterForm, name: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Imagen URL</label>
                            <input type="text" className="form-control" value={characterForm.image} onChange={(e) => setCharacterForm({ ...characterForm, image: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Especie</label>
                            <input type="text" className="form-control" value={characterForm.species} onChange={(e) => setCharacterForm({ ...characterForm, species: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <input type="text" className="form-control" value={characterForm.status} onChange={(e) => setCharacterForm({ ...characterForm, status: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Género</label>
                            <input type="text" className="form-control" value={characterForm.gender} onChange={(e) => setCharacterForm({ ...characterForm, gender: e.target.value })} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Personaje</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setEditingCharacter(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CharacterManager;
