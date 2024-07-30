import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/user-profile">Perfil de Usuario</Link>
          </li>
          <li>
            <Link to="/favorites">Favoritos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
