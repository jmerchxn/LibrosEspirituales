import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { BookCard } from "../../components/BookCard/BookCard.jsx";
import { useContext } from "react"; // Asegúrate de importar useContext
import { AuthContext } from "../../context/AuthContext"; // Importa tu contexto

const Home = () => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const toBooks = () => {
    navigate("/books");
  };
  const toTrivia = () => {
    navigate("/trivia");
  };
  const { user } = useContext(AuthContext); // Extraemos el usuario del contexto
  const getUltimosLibros = async () => {
    try {
      const response = await axios.get("http://localhost:3000/libros/recent"); // 
      setLibros(response.data.data); // Accedemos a los datos
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUltimosLibros();
  }, []);

  console.log('hola');

  return (
    <div>
      <section className="ultAgregados">
        <h2>Últimos Agregados</h2>

        {/* Muestra los tres últimos libros */}
       {libros && libros.length > 0 ? (
          <div className="row">
            {libros.map((libro) => (
              <div className="col-md-4 mb-4" key={libro._id}>
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

        <button onClick={toBooks}>Explora más Libros</button>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        style={{ padding: 20 }}
      >
        <section className="encabezadoTrivia">
          <button
            style={{ background: "black", color: "white" }}
            onClick={toTrivia}
          >
            Descubrí tu libro
          </button>
        </section>
      </motion.div>
    </div>
  );
};

export { Home };
