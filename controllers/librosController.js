import libroModel from "../models/librosModel.js";
import autorModel from "../models/autorModel.js";
import etapaModel from "../models/etapaModel.js";

const createLibro = async (req, res) => {
  try {
    const { name, autor, etapa, complejidad } = req.body;

    let autorExistente = await autorModel.findOne({ name: autor });
    if (!autorExistente) {
      autorExistente = new autorModel({ name: autor });
      await autorExistente.save();
    }

    let etapaExistente = await etapaModel.findOne({ name: etapa });
    if (!etapaExistente) {
      etapaExistente = new etapaModel({ name: etapa });
      await etapaExistente.save();
    }

    const libro = new libroModel({
      name,
      autor: autor,
      etapa: etapa,
      complejidad,
    });

    const libroGuardado = await libro.save();

    res.status(200).json({ msg: "success", data: libroGuardado });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const getLibrosById = async (req, res) => {
  const { id } = req.params;
  try {
    const libros = await libroModel
      .findById(id)
      .populate("autor", "name")
      .populate("etapa", "name");
    res.status(200).json({ msg: "success", data: libros });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const getLibros = async (req, res) => {
  try {
    const libros = await libroModel
      .find()
      .populate("autor", "name")
      .populate("etapa", "name");

    res.status(200).json({ msg: "success", data: libros });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const updateLibros = async (req, res) => {
  const { id } = req.params;
  const { complejidad } = req.body;
  try {
    const libro = await libroModel.findByIdAndUpdate(
      id,
      { complejidad },
      { new: true }
    );
    res.status(200).json({ msg: "success", data: libro });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

const deleteLibrosById = async (req, res) => {
  const { id } = req.params;
  try {
    const libros = await libroModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "success", data: libros });
  } catch (error) {
    res.status(500).json({ msg: "error", data: [] });
    console.error(error);
  }
};

export {
  createLibro,
  getLibrosById,
  getLibros,
  updateLibros,
  deleteLibrosById,
};
