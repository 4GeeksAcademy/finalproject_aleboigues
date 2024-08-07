import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import CharacterManager from "../component/characterManager";
import "/workspaces/finalproject_aleboigues/src/front/styles/styles.css";

const Characters = () => {
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const navigate = useNavigate();
    const { store, actions } = useContext(Context); 

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        } else {
            // Solo llamamos a createApiCharacters si no tenemos personajes en el estado
            if (store.characters.length === 0) {
                actions.createApiCharacters(); // Carga personajes al iniciar
            } else {
                setFilteredCharacters(store.characters); // Si ya hay personajes, los filtramos
            }
        }
    }, [navigate, store.characters.length, actions]);

    const handleSearch = (query) => {
        const filtered = store.characters.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCharacters(filtered);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(`${process.env.BACKEND_URL}/api/characters/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const updatedCharacters = filteredCharacters.filter(character => character.id !== id);
            setFilteredCharacters(updatedCharacters);
            actions.createApiCharacters(); // Vuelve a cargar personajes después de eliminar
            alert("Personaje eliminado exitosamente");
        } else {
            const errorData = await response.json();
            alert("Error al eliminar personaje: " + errorData.message);
        }
    };

    return (
        <div className="container">
            <h1 className="characterRM text-center my-4">Personajes de Rick y Morty</h1>
            <CharacterManager onCharacterUpdate={handleSearch} />
            <div className="row">
                {filteredCharacters.map((character) => (
                    <div key={character.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={character.image} className="card-img-top" alt={character.name} />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">Especie: {character.species}</p>
                                <p className="card-text">Estado: {character.status}</p>
                                <p className="card-text">Género: {character.gender}</p>
                                <button className="btn btn-danger mt-2" onClick={() => handleDelete(character.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
