import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const etapaCollection = 'etapa';

const etapaSchema = new Schema({
    name: String,
    created: {
        type: Date,
        default: Date.now
    }

})

const etapaModel = mongoose.model(etapaCollection, etapaSchema);
export default etapaModel;