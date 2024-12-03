import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Ícono de corazón lleno
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Ícono de corazón vacío

const BookCard = ({
  imagen,
  name,
  autor,
  etapa,
  descripcion,
  complejidad,
  comentario,
  onFavoriteToggle, // Prop para manejar favoritos
  isFavorite = false, // Indica si es favorito inicialmente
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onFavoriteToggle(); // Llama a la función recibida desde el padre
  };

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={imagen}
            className="img-fluid rounded-start"
            alt={name}
          />
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
            <FontAwesomeIcon
              icon={favorite ? solidHeart : regularHeart} 
              style={{ color: favorite ? "#74C0FC" : "#74C0FC", cursor: "pointer",   fontSize: "2rem"  }}
              onClick={handleFavoriteClick} // Llama a la función al hacer clic
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookCard };

