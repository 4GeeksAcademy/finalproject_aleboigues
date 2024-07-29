import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CharacterDetail = () => {
    const [character, setCharacter] = useState(null);
    const params = useParams();

    useEffect(() => {
        fetchCharacterDetail(params.characterid);
    }, [params.characterid]);

    const fetchCharacterDetail = async (id) => {
        const response = await fetch(process.env.BACKEND_URL + `/api/characters/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            setCharacter(data);
        } else {
            console.error("Error fetching character details");
        }
    };

    if (!character) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row justify-content-center align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={character.image} alt={character.name} />
                </div>
                <div className="col-4 informacionPersonaje">
                    <h2 className="text-center">{character.name}</h2>
                    <p className="text-center">{character.species}</p>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-10 tablainfo">
                        <table className="table tablaPersonaje text-danger">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Especie</th>
                                    <th scope="col">Estado</th>
                                    <th scope="col">Género</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{character.name}</td>
                                    <td>{character.species}</td>
                                    <td>{character.status}</td>
                                    <td>{character.gender}</td>
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
