import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookCard } from "../../components/BookCard.jsx";

const Books = () => {
  const navigate = useNavigate();
  const [libros, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritos, setFavoritos] = useState([]);

  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/libros");
      setBooks(response.data.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      setLoading(false);
    }
  };
  const handleFavoriteToggle = async (libroId) => {
    try {
      if (favoritos.includes(libroId)) {
        // Si el libro ya es favorito, eliminamos de favoritos
        await axios.delete(
          `http://localhost:3000/user/${userId}/favoritos/${libroId}`
        );
      } else {
        // Si el libro no es favorito, lo agregamos
        await axios.post(`http://localhost:3000/user/${userId}/favoritos`, {
          libroId,
        });
      }

      // Actualizamos los favoritos en el estado local después de la operación
      setFavoritos((prevFavoritos) =>
        prevFavoritos.includes(libroId)
          ? prevFavoritos.filter((id) => id !== libroId)
          : [...prevFavoritos, libroId]
      );
    } catch (error) {
      console.error("Error al modificar favoritos:", error);
    }
  };
  useEffect(() => {
    getAllBooks();
  }, []);
  useEffect(() => {
    if (libros.length > 0) {
      console.log("Libros actualizados:", libros);
    }
  }, [libros]);

  const toAddBooks = () => {
    navigate("/addbooks");
  };

  return (
    <div>
      <button onClick={toAddBooks} className="btn btn-success mb-3">
        Agrega un libro!
      </button>

      {loading ? (
        <p>Cargando libros...</p>
      ) : libros.length > 0 ? (
        <div className="row">
          {libros.map((libro) => (
            <div className="col-md-6 mb-4" key={libro._id}>
              <BookCard
                imagen={libro.imagen}
                name={libro.name}
                autor={libro.autor.name}
                etapa={libro.etapa.name}
                descripcion={libro.descripcion}
                complejidad={`Complejidad: ${libro.complejidad}`}
                comentario={libro.comentario}
                isFavorite={favoritos.includes(libro._id)}
                onFavoriteToggle={() => handleFavoriteToggle(libro._id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay libros disponibles.</p>
      )}
    </div>
  );
};

export { Books };
