import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Ícono de corazón lleno
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Ícono de corazón vacío
import { useContext } from "react"; // Asegúrate de importar useContext
import { AuthContext } from "../../context/AuthContext"; // Importa tu contexto
import axios from "axios";

const BookCard = ({
  libroId,
  imagen,
  name,
  autor,
  etapa,
  descripcion,
  complejidad,
  comentario,
}) => {
  const [favorite, setIsFavoriteBook] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // sacamos el user de auth context
  const { user } = useContext(AuthContext);

  const isFavorite = async (libroId) => {
    const userId = user?.id;

    try {
      // es un libro favorito ?, response devuelve un booleano
      const response = await axios.get(
        `http://localhost:3000/users/${userId}/favorito/${libroId}`
      );
      setIsFavoriteBook(response.data.data);
    } catch (error) {
      console.error("Error al preguntar si es un libro favorito", error);
    }
  };

  useEffect(() => {
    isFavorite(libroId);
  }, [user?.id, libroId, reload]);

  const handleFavoriteToggle = async () => {

    console.log(libroId, user?.id);

    const userId = user?.id; // Obtén el ID del usuario desde el contexto
    if (!userId) {
      console.error("El ID del usuario no está definido.");
      return;
    }

    

    try {
      // Si el libro no es favorito, lo agregamos
      await axios.post(`http://localhost:3000/users/${userId}/favoritos`, {
        libroId,
      });
      setReload(true);
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    }
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imagen} className="img-fluid rounded-start" alt={name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{autor}</p>
            <p className="card-text">{etapa}</p>
            <p className="card-text">{descripcion}</p>
            <p className="card-text">
              <small className="text-muted">{complejidad}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">{comentario}</small>
            </p>
            {console.log(typeof handleFavoriteToggle)}
            <button style={{backgroundColor: 'white'}} onClick={handleFavoriteToggle}>
              <FontAwesomeIcon
                icon={favorite ? solidHeart : regularHeart}
                style={{
                  color: favorite ? "#74C0FC" : "#74C0FC",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookCard };
