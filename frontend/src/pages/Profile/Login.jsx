import React, { useContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const {user, setUser, logout}= useContext(AuthContext)
  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/users/login', userData);
      console.log(res);
      setUser(res.data.user)
      console.log(res.data.jwToken);
      Cookies.set('jwToken', res.data.jwToken, { expires: 2 });
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msj || "Error al iniciar sesión");

    }
  };



  const toRegister = () => {
    navigate("/register");
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Dirección de correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          ></input>
        </div>
        <div>
          <p></p>
        </div>
        <button onClick={handleLogin} className="btn btn-primary">
          Iniciar sesión
        </button>
        <p style={{cursor: "pointer", padding: "2rem"}} onClick={toRegister}>¡Registrate aquí!</p>
        {
          error && <p>{error}</p>
        }
      </form>
    </div>
  )
}

export {Login}