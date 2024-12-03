import React from "react";
import { useNavigate } from "react-router-dom";
import{motion} from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const toBooks = () => {
    navigate("/books");
  };
  const toTrivia = () => {
    navigate("/trivia");
  };

  return (
    <div>
      <section className="ultAgregados">
        <button onClick={toBooks}>Explora más Libros</button>
      </section>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
      style={{ padding: 20 }}
    >
      <section className="encabezadoTrivia">
        <button style={{ background: 'black', color: 'white' }} onClick={toTrivia}>
          Descubrí tu libro
        </button>
      </section>
    </motion.div>

    </div>
  );
};

export { Home };
