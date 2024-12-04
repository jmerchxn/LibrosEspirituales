import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:3000/users/create", userData);
        console.log("Usuario registrado:", res.data); // Accedes a la respuesta correctamente.
        navigate('/login');
    } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "Error al registrar el usuario");
    }
};
  return (
    <div className="register-container">
      <h2 className="text-center">
        Registrate aquí para participar en nuetra comunidad!
      </h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            className="form-control"
            value={userData.lastname}
            onChange={(e) =>
              setUserData({ ...userData, lastname: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={userData.username}
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Dirección de correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </div>
        <button onClick={handleRegister} className="btn btn-primary w-15">
          Registrarme
        </button>
        {
          error && <p>{error}</p>
        }
      </form>
    </div>
  );
}

export { Register };
