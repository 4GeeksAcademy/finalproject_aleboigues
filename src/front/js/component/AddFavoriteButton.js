import React, { useState } from 'react';

const AddFavoriteButton = ({ characterId, token }) => {
    const [responseMessage, setResponseMessage] = useState('');

    const addFavorite = () => {
        fetch(`${process.env.BACKEND_URL}/api/addfavorite`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({
                character_id: characterId  
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
