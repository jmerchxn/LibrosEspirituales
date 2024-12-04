import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo o nombre de la página */}
        <NavLink to="/" className="navbar-brand">
          Nuevos Comienzos
        </NavLink>

        {/* Botón de menú hamburguesa (solo visible en móviles) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación (solo visible en móviles) */}
        <div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/books" className="nav-link">
                  Libros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/community" className="nav-link">
                  Comunidad
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user/:id" className="nav-link">
                  Perfil
                </NavLink>
              </li>
              {user ? (
                <li className="nav-item">
                  <button onClick={logout} className="btn  text-end">
                    <NavLink to="/login">Cerrar Sesión</NavLink>
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Iniciar Sesión
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
