import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setUser(data);
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container">
            <h1>Perfil de Usuario</h1>
            <p>Email: {user.email}</p>
            {/* Agrega más información del usuario aquí */}
        </div>
    );
};

export default UserProfile;
