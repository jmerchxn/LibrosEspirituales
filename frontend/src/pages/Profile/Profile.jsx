import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <div>
      Profile ID: {id}
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
