import etapaModel from "../models/etapaModel.js"
import { etapaValida } from "../validations/validations.js";
const createEtapa = async (req, res) =>{
    const { name } = req.body;
    try {
        const etapa = new etapaModel({ name, completed: false});

        const result = await etapa.save();
    
        res.status(200).json({ msg: "success", data: result});
    } catch (error) {
        res.status(500).json({ msg: "error", data: []});
        console.error(error);
        
    }
}

const getEtapaById = async (req, res) =>{

    const { id } = req.params;
    try {
        const etapas = await etapaModel.findById(id);
        res.status(200).json({ msg: "success", data: etapas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

const getEtapas = async (req, res) =>{
    try {
        const etapas = await etapaModel.find();
        res.status(200).json({ msg: "success", data: etapas })

    } catch (error) {
        res.status(500).json({ msg: "error", data: [] })
        console.error(error);
        
    }
}

export { createEtapa, getEtapaById, getEtapas }