import React from 'react';
import { Link } from 'react-router-dom';
import AddFavoriteButton from './AddFavoriteButton';

const CharacterCard = ({ character, token }) => {
    return (
        <div className="card h-100">
            <img src={character.image} className="card-img-top" alt={character.name} />
           
        </div>
    );
};

export default CharacterCard;
