import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import CharacterManager from "../component/characterManager";

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
            <h1 className="text-center my-4">Personajes de Rick y Morty</h1>
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
                                <div className="d-flex-row">
                                    <Link to={"/characterdetail/" + character.id}>
                                        <button className="btn btn-outline-primary mx-5">Learn More!</button>
                                    </Link>
                                    <button
                                        onClick={() => actions.favorito(character.name)}
                                        className="btn btn-outline-warning mx-5"
                                    >
                                        {actions.colorBoton(character.name) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
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
