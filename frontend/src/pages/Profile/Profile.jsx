import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../../context/AuthContext"; 

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Bienvenido/a {user?.username}</h2>
      <nav>
        <ul>
          <li><Link to="/favs">Favoritos</Link></li>
          <li><Link to="/myposts">Mis posts</Link></li>
          
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export { Profile };
