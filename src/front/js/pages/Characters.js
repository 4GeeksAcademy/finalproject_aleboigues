import React, { useEffect, useState } from "react";

const Characters = () => {

   const [characters, setCharacters] = useState([]);

   async function ejecutarApiExterna() {
      const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/apiexterna", { method: "POST", headers: { "Content-Type": "application/json" } });
      const data = await response.jscon();
   };

   async function traerPersonajes() {
      const response = await fetch("https://improved-space-meme-qpxxp9766r9c44qp-3001.app.github.dev/api/characters", { method: "GET" });
      const data = await response.json();
      setCharacters(data);
   };

   useEffect(() => {
      ejecutarApiExterna();
      traerPersonajes();

   }, [])

   return (

      <div className="container">
         <h1 className="text-center my-4">Personajes de Rick and Morty</h1>
         <div className="row">
            {characters.map((character, index) => (
               <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100">
                     <img src={character.image} className="card-img-top" alt={character.name} />
                     <div className="card-body">
                        <h5 className="card-title">{character.name}</h5>
                        <p className="card-text">Especie: {character.species}</p>
                        <p className="card-text">Estado: {character.status}</p>
                        <p className="card-text">Género: {character.gender}</p>
                        <button className="btn btn-success">Añadir a Favoritos</button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>

   );
};


export default Characters;