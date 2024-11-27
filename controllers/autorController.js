import autorModel from "../models/autorModel.js";
import { validateAutorName } from "../validations/validations.js"; 


const createAutor = async (req, res) => {
    const { name } = req.body;
    
    const validationError = await validateAutorName(name); 
    if (validationError) {
        return res.status(400).json({ msg: validationError });
    }
    try {
        const autor = new autorModel({ name });
        const result = await autor.save(); 
        res.status(200).json({ msg: "success", data: result });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ msg: "error", data: "El nombre ya existe" });
        } else {
            res.status(500).json({ msg: "error", data: "Error interno del servidor" });
        }
        console.error(error);
    }
};
const getAutorById = async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await autorModel.findById(id);
        if (!autor) {
            return res.status(404).json({ msg: "error", data: "Autor no encontrado" });
        }
        res.status(200).json({ msg: "success", data: autor });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getAutorByName = async (req, res) => {
    const { name } = req.params;
    try {
        const autor = await autorModel.findOne({ name: name });
        if (!autor) {
            return res.status(404).json({ msg: "error", data: "Autor no encontrado" });
        }
        res.status(200).json({ msg: "success", data: autor });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const getAutores = async (req, res) => {
    try {
        const autores = await autorModel.find();
        res.status(200).json({ msg: "success", data: autores });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

const deleteAutorById = async (req, res) => {
    const { id } = req.params;
    try {
        const autor = await autorModel.findByIdAndDelete(id);
        if (!autor) {
            return res.status(404).json({ msg: "error", data: "Autor no encontrado" });
        }
        res.status(200).json({ msg: "success", data: autor });
    } catch (error) {
        res.status(500).json({ msg: "error", data: [] });
        console.error(error);
    }
};

export { createAutor, getAutorById, getAutorByName, getAutores, deleteAutorById };
