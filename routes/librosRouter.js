import { Router } from "express";
import { createLibro, getLibrosById, getLibros, updateLibros, deleteLibrosById } from "../controllers/librosController.js";
import { validarLibro } from "../validations/validations.js";

const router = Router();

router.post('/create', validarLibro, createLibro);
router.get('/:id', getLibrosById);
router.get('/', getLibros);
router.put('/:id', updateLibros);
router.delete('/:id', deleteLibrosById);


export default router;