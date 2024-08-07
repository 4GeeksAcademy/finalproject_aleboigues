import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

const AddFavoriteButton = ({ characterId }) => {
    const { store, actions } = useContext(Context);
    const [responseMessage, setResponseMessage] = useState('');

    const addFavorite = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setResponseMessage('No estás autenticado');
            return;
        }
        try {
            const message = await actions.addFavorite(characterId, token);
            setResponseMessage(message);
        } catch (error) {
            setResponseMessage(error.message);
        }
    };

    return (
        <div>
            <button onClick={addFavorite}>Agregar a Favoritos</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddFavoriteButton;
