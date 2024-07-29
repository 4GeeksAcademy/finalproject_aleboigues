import React, { useState } from "react";

const CreateManager = () => {
    const [characterForm, setCharacterForm] = useState({
        name: '',
        image: '',
        species: '',
        status: '',
        gender: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacterForm({ ...characterForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(process.env.BACKEND_URL + "/api/characters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
                },
                body: JSON.stringify(characterForm)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido al crear el personaje.");
            }

            alert('Personaje creado exitosamente');
            setCharacterForm({
                name: '',
                image: '',
                species: '',
                status: '',
                gender: ''
            });
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Crear Personaje</h2>
            {loading && <p>Cargando...</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={characterForm.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen URL</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={characterForm.image}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Especie</label>
                    <input
                        type="text"
                        className="form-control"
                        name="species"
                        value={characterForm.species}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        name="status"
                        value={characterForm.status}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={characterForm.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Personaje</button>
            </form>
        </div>
    );
};

export default CreateManager;
