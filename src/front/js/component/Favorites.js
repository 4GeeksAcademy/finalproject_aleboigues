import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';

const Favorites = () => {
    const { store, actions } = useContext(Context);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            //const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');
            //if (!userId || !token) {
                //console.error("User ID or token is missing");
                //return;
            //}
            const response = await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
            } else {
                console.error('Error fetching favorites:', response.statusText);
            }
        };

        fetchFavorites();
    }, []);

    const eliminarFavorito = async (favId) => {
        const token = localStorage.getItem('token');
        try {
            await actions.removeFavorite(favId, token);
        } catch (error) {
            console.error('Error al eliminar el favorito:', error.message);
        }
    };

    return (
        <div className="fav container">
            <h1>Favoritos</h1>
            <div className="non-fav row">
                {favorites.length === 0 ? (
                    <p>No tienes personajes favoritos.</p>
                ) : (
                    favorites.map(fav => (
                        <div key={fav.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100">
                                <img src={fav.image} className="card-img-top" alt={fav.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{fav.name}</h5>
                                    <button className="btn btn-danger" onClick={() => eliminarFavorito(fav.id)}>Eliminar de Favoritos</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;
