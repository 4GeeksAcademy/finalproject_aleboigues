import React, { useEffect, useState } from 'react';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');  // Asegúrate de obtener el token JWT almacenado
            const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`  // Incluye el token JWT en la cabecera
                }
            });
            const data = await response.json();
            setFavorites(data);
        };

        fetchFavorites();
    }, []);

    const eliminarFavorito = async (favId) => {
        const token = localStorage.getItem('token');  // Asegúrate de obtener el token JWT almacenado
        const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/${favId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`  // Incluye el token JWT en la cabecera
            }
        });
        if (response.ok) {
            setFavorites(favorites.filter(fav => fav.id !== favId));
        } else {
            console.error('Error al eliminar el favorito');
        }
    };

    return (
        <div className="container">
            <h1>Favoritos</h1>
            <div className="row">
                {favorites.map(fav => (
                    <div key={fav.id} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={fav.image} className="card-img-top" alt={fav.name} />
                            <div className="card-body">
                                <h5 className="card-title">{fav.name}</h5>
                                <button className="btn btn-danger" onClick={() => eliminarFavorito(fav.id)}>Eliminar de Favoritos</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
