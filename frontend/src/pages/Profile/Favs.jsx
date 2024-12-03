import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookCard } from "../../components/BookCard.jsx";

const Favs = ({id}) => {
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}/favoritos`);
        setLibrosFavoritos(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los favoritos:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchFavoritos(); 
    }
  }, [id]); 

  return (
    <div>
      <h1>Mis Favoritos</h1>
      {loading ? (
        <p>Cargando favoritos...</p>
      ) : librosFavoritos.length > 0 ? (
        <div className="row">
          {librosFavoritos.map((libro) => (
            <div className="col-md-6 mb-4" key={libro._id}>
              <BookCard
                imagen={libro.imagen}
                name={libro.name}
                autor={libro.autor.name}
                etapa={libro.etapa.name}
                descripcion={libro.descripcion}
                complejidad={`Complejidad: ${libro.complejidad}`}
                comentario={libro.comentario}
                isFavorite={true} 
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes libros en favoritos.</p>
      )}
    </div>
  );
};

export { Favs };
