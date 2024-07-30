import React, { useState } from 'react';

const AddFavoriteButton = ({ characterId, token }) => {
    const [responseMessage, setResponseMessage] = useState('');

    const addFavorite = () => {
        fetch(`${process.env.BACKEND_URL}/api/addfavorite`, { // Asegúrate de que la URL de tu API es correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Incluye el token JWT en la cabecera
            },
            body: JSON.stringify({
                character_id: characterId  // ID del personaje que quieres agregar a favoritos
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResponseMessage(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            setResponseMessage('Ocurrió un error al agregar a favoritos');
        });
    };

    return (
        <div>
            <button onClick={addFavorite}>Agregar a Favoritos</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddFavoriteButton;
