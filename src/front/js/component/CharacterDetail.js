// src/front/js/component/CharacterDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        // Fetch character details from backend
        const fetchCharacter = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/characters/${id}`);
            const data = await response.json();
            setCharacter(data);
        };

        fetchCharacter();
    }, [id]);

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <img className="img-fluid" src={character.image} alt={character.name} />
                </div>
                <div className="col-4 informacionPersonaje">
                    <h2 className="text-center">{character.name}</h2>
                    <p className="text-center">{character.description}</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-10 tablainfo">
                        <table className="table tablaPersonaje text-danger">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Especie</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Género</th>
                                    <th scope="col">Origen</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{character.name}</td>
                                    <td>{character.species}</td>
                                    <td>{character.status}</td>
                                    <td>{character.gender}</td>
                                    <td>{character.origin.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
