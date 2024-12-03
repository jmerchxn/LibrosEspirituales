import React, { useState } from "react";
import axios from "axios";

const AddBooks = () => {
  const [name, setName] = useState("");
  const [autor, setAutor] = useState("");
  const [etapa, setEtapa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [complejidad, setComplejidad] = useState("");
  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState("");
  const [error, setError] = useState("");

  const handleComplejidadChange = (e) => {
    setComplejidad(e.target.value);
  };

  const handleAddLibro = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    const newLibro = {
      name,
      autor,
      etapa,
      descripcion,
      complejidad,
      comentario,
      imagen,
    };
    console.log(newLibro);
    try {
      const response = await axios.post(
        "http://localhost:3000/libros/create",
        newLibro,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data) {
        alert("Libro creado ");
      }
    } catch (error) {
      console.error("Error al agregar el libro:", error);
      const errorMessage = error.response?.data?.data?.message || "Error al agregar el libro";
      setError(errorMessage);
    }

    console.log("Name:", name);
    console.log("Autor:", autor);
    console.log("Etapa:", etapa);
    console.log("Descripción:", descripcion);
  };

  return (
    <div>
      <h2>Compartí tu saber con la comunidad!</h2>
      <form onSubmit={handleAddLibro}>
      
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Nombre del libro
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Nombre del autor
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            ¿En qué momento de la vida alguien necesitaría leer este libro?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput3"
            value={etapa}
            onChange={(e) => setEtapa(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput4" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
           URL
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          ></input>
        </div>
        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            value={complejidad}
            onChange={handleComplejidadChange}
            aria-label="Floating label select example"
          >
            <option value="">¿Cuál es la complejidad del libro?</option>
            <option value="Básico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
          <label htmlFor="floatingSelect">Seleccione una opción</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea2">
            ¿Qué sensaciones tuviste al leerlo?
          </label>
        </div>
        <button
          type="submit" // Asegúrate de que el botón sea de tipo submit
          className="btn btn-primary mt-3"
        >
          Enviar
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};

export { AddBooks };
