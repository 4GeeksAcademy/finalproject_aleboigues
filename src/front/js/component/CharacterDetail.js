import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ElementDetail = () => {
    const { id } = useParams(); 
    const [element, setElement] = useState(null);

    useEffect(() => {
        const fetchElementDetail = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/characters/${id}`); 
            const data = await response.json();
            setElement(data);
        };

        fetchElementDetail();
    }, [id]);

    if (!element) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <h1>{element.name}</h1>
            <img src={element.image} alt={element.name} />
            <p>Especie: {element.species}</p>
            <p>Estado: {element.status}</p>
            <p>Género: {element.gender}</p>
           
        </div>
    );
};

export default ElementDetail;
