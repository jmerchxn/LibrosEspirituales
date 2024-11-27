import librosModel from "../models/librosModel.js";
import autorModel from "../models/autorModel.js";
import etapaModel from "../models/etapaModel.js";

const createLibro = async (req, res) => {
  try {
    const { name, autor, etapa, descripcion, complejidad } = req.body;
    let autorExistente = await autorModel.findOne({ name: autor });
    let etapaExistente = await etapaModel.findOne({ name: etapa });    

    const libro = new librosModel({
      name,
      autor: autorExistente._id.toString(),
      etapa: etapaExistente._id.toString(),
      descripcion,
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
    const libros = await librosModel
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
    const libros = await librosModel
      .find()
      .populate("autor", "name")
      .populate("etapa", "name");

    res.status(200).json({ msg: "success", data: libros });
  } catch (error) {
    console.log(error)
    
    res.status(500).json({ msg: "error", error });
    console.error(error);
  }
};

const updateLibros = async (req, res) => {
  const { id } = req.params;
  const { complejidad } = req.body;
  try {
    const libro = await librosModel.findByIdAndUpdate(
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
    const libros = await librosModel.findByIdAndDelete(id);
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
