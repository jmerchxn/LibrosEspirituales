import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookCard } from "../../components/BookCard/BookCard.jsx";

const Books = () => {
  const navigate = useNavigate();
  const [libros, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const getAllBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/libros");
      setBooks(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  const toAddBooks = () => {
    navigate("/addbooks");
  };

  console.log('BOOKS SALGO DOS VECES')

  return (
    <div className="book-list">
      <button onClick={toAddBooks} className="btn btn-success mb-3">
        Agrega un libro!
      </button>

      {loading ? (
        <p>Cargando libros...</p>
      ) : libros.length > 0 ? (
        <div className="row">
          {libros.map((libro, index) => (
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
