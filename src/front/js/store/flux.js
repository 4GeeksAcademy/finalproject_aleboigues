const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            favorites: []
        },
        actions: {
            getMessage: () => {
                // Aquí puedes definir la lógica para obtener un mensaje
            },
            createApiCharacters: () => {
                fetch(process.env.BACKEND_URL + "/api/apiexterna", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Datos almacenados:', data.stored_characters);
                        console.log('Errores:', data.errors);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            },
            addFavorite: async (characterId, token) => {
                console.log(`Adding favorite: characterId=${characterId}, token=${token}`);
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/addfavorite`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            item_id: characterId
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error response:', errorData);
                        throw new Error(errorData.message || 'Error al añadir a favoritos');
                    }

                    const data = await response.json();
                    const store = getStore();
                    setStore({ favorites: [...store.favorites, data.favorite] });
                    console.log('Favorite added:', data.favorite);
                    return data.message;
                } catch (error) {
                    console.error('Error adding favorite:', error.message);
                    throw error;
                }
            },
            removeFavorite: async (favId, token) => {
                console.log(`Removing favorite: favId=${favId}, token=${token}`);
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/favorites/${favId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error response:', errorData);
                        throw new Error(errorData.message || 'Error al eliminar de favoritos');
                    }

                    const store = getStore();
                    setStore({ favorites: store.favorites.filter(fav => fav.id !== favId) });
                    console.log('Favorite removed:', favId);
                } catch (error) {
                    console.error('Error removing favorite:', error.message);
                    throw error;
                }
            }
        }
    };
};

export default getState;
