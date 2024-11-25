import { Router } from "express";
import { getAutorById, getAutores, getAutorByName, createAutor, deleteAutorById } from "../controllers/autorController.js";
import { validateAutorName } from '../validations/validations.js';

const router = Router();

router.delete('/:id', deleteAutorById);
router.post('/autores', validateAutorName, createAutor);
router.get('/name/:name', getAutorByName);
router.get('/:id', getAutorById);
router.get('/', getAutores);



export default router;