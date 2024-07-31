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
                        console.log('Datos almacenados:', data.stored_character);
                        console.log('Errores:', data.errors);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    };
};export default getState;