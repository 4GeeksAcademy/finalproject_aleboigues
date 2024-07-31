// src/front/js/flux.js

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [],
            favorites: [] // Para almacenar los personajes favoritos
        },
        actions: {
            getMessage: () => {
                // Aquí puedes definir la lógica para obtener un mensaje
            },
            createApiCharacters: async () => {
                const response = await fetch(`${process.env.BACKEND_URL}/api/characters`);
                const data = await response.json();
                setStore({ characters: data }); // Guarda los personajes en el estado
            },
            favorito: (name) => {
                const store = getStore();
                const favorites = store.favorites.includes(name)
                    ? store.favorites.filter(fav => fav !== name)
                    : [...store.favorites, name];
                setStore({ favorites });
            },
            colorBoton: (name) => {
                const store = getStore();
                return store.favorites.includes(name);
            }
        }
    };
};

export default getState;
