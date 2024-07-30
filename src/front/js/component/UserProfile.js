import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Cambia useHistory a useNavigate

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Asegúrate de almacenar el token después del login
      const response = await fetch('https://your-api-url.com/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData({
          email: data.email,
          password: '',
        });
      } else {
        console.error('Error al obtener el perfil del usuario');
      }
    };

    fetchUser();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('https://your-api-url.com/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } else {
      console.error('Error al actualizar el perfil del usuario');
    }
  };

  if (!user) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras obtienes los datos
  }

  return (
    <div className="user-profile-container">
      <h1>Perfil de Usuario</h1>
      <div className="user-info">
        <p>Email: {user.email}</p>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={handleEditToggle}>
            Cancelar
          </button>
        </form>
      ) : (
        <button onClick={handleEditToggle}>Editar Perfil</button>
      )}
      <button onClick={() => navigate('/')}>Volver a Inicio</button>
    </div>
  );
};

export default UserProfile;
