// src/front/js/pages/CreateCharacter.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/workspaces/finalproject_aleboigues/src/front/styles/createcharacter.css";
const CreateCharacter = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [species, setSpecies] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(process.env.BACKEND_URL + "/api/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name, image, species, status, gender })
        });

        if (response.ok) {
            alert("Personaje creado exitosamente");
            navigate("/character"); // Redirigir a la lista de personajes
        } else {
            const errorData = await response.json();
            alert("Error al crear personaje: " + errorData.message);
        }
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Crear Personaje</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Imagen URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="species">Especie</label>
                    <input
                        type="text"
                        className="form-control"
                        id="species"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Género</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Personaje</button>
            </form>
        </div>
    );
};

export default CreateCharacter;
