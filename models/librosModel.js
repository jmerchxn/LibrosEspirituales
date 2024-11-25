import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const libroCollection = 'Libros';

const libroSchema = new Schema({
    name: String,
    autor: { type: Schema.Types.ObjectId, ref: 'autor' },
    etapa: { type: Schema.Types.ObjectId, ref: 'etapa' },
    complejidad: String,
    created: {
        type: Date,
        default: Date.now
    }
})

const libroModel = mongoose.model(libroCollection, libroSchema);
export default libroModel;