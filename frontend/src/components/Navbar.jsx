import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/">Nuevos Comienzos</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            <li className="nav-item dropdown">
              <NavLink to="/user/:id" className="nav-link">
                Perfil
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export { Navbar };
