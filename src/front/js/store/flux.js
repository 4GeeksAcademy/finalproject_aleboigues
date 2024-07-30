const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try{
                  
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
                    const data = await resp.json()
                    setStore({ message: data.message })
                  
                    return data;
                }catch(error){
                    console.log("Error loading message from backend", error)
                }
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

            changeColor: (index, color) => {
              
                const store = getStore();

        
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
