import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookCard } from "../../components/BookCard/BookCard.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Favs = ({}) => {
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  // sacar el userId del context
  const { user } = useContext(AuthContext)

  console.log(useContext(AuthContext));
  
  useEffect(() => {
    const userId = user?.id;

    console.log(userId, 'este es el usuario')

    const fetchFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}/favoritos`);
        setLibrosFavoritos(response.data.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los favoritos:", error);
        setLoading(false);
      }
    };
    if (userId) {
      fetchFavoritos(); 
    }
  }, [user, librosFavoritos]); 

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
                libroId={libro._id}
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
