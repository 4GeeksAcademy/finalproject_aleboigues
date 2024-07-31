import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CharacterManager from "../component/characterManager";
import { useContext } from "react";
import { Context } from "../store/appContext";

const Characters = () => {
    const { actions } = useContext(Context);
    const [characters, setCharacters] = useState([]); // Almacena todos los personajes
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            navigate('/home');
        } else {
            fetchCharacters(); // Llama a la función para cargar personajes
        }
    }, [navigate]);

    // Función para cargar personajes desde el backend
    const fetchCharacters = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/characters`);
        const data = await response.json();
        setCharacters(data); // Guarda todos los personajes
        setFilteredCharacters(data); // Inicialmente filtra los personajes para mostrar todos
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = characters.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCharacters(filtered); // Filtra los personajes basándose en la búsqueda
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
            // Filtra el personaje eliminado de la lista filtrada
            setFilteredCharacters(filteredCharacters.filter(character => character.id !== id));
            setCharacters(characters.filter(character => character.id !== id)); // Mantiene la lista original actualizada
            alert("Personaje eliminado exitosamente");
        } else {
            const errorData = await response.json();
            alert("Error al eliminar personaje: " + errorData.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
            <CharacterManager onCharacterUpdate={(characters) => {
                // Llama a la función de búsqueda después de que se actualizan los personajes
                handleSearch(searchQuery);
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
                                <Link to={"/characterdetail/" + index}>
                                    <button className="btn btn-outline-primary mx-1">Learn More!</button>
                                </Link>
                                <button onClick={() => actions.favorito(character.name)} className="btn btn-outline-warning mx-1">Favorito</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(character.id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Characters;
