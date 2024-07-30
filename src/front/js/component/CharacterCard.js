import React from 'react';
import AddFavoriteButton from './AddFavoriteButton';

const CharacterCard = ({ character, token }) => {
    return (
        <div className="card h-100">
            <img src={character.image} className="card-img-top" alt={character.name} />
            <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <AddFavoriteButton characterId={character.id} token={token} />
            </div>
        </div>
    );
};

export default CharacterCard;
