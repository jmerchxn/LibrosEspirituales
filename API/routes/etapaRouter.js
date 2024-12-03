import { Router } from "express";
import { getEtapaById, getEtapas, createEtapa } from "../controllers/etapaController.js";
import { etapaValida } from '../validations/validations.js';
const router = Router();

router.post('/', etapaValida, createEtapa);
router.get('/:id', getEtapaById);
router.get('/', getEtapas);



export default router;