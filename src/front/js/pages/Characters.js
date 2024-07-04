import React, { useEffect, useState } from "react";

 const Characters = () => {

 const [characters, setCharacters] = useState ([]);

 async function ejecutarApiExterna (){
    const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/apiexterna", {method:"POST", headers:{"Content-Type":"application/json"}}); 
    const data = await response.jscon();
};

 async function traerPersonajes (){
    const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/characters", {method:"GET"});
    const data = await response.json();
    setCharacters(data);
 };

 useEffect(()=>{
    ejecutarApiExterna();
    traerPersonajes();

 }, [])

	return ( 
        
        <>
        <h1>Personajes Rick N Morty</h1>
        {characters.map(item => ( 
            <>
            <img src={item.image}></img>
            <h2>{item.name}</h2>
            <p>Especie:{item.species}</p>
            <p>Estado:{item.status}</p>
            <p>Género:{item.gender}</p>
           </>
        ))}
        </>
		
	);
};


export default Characters;