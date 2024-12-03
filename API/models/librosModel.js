import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const libroCollection = 'libros';

const libroSchema = new Schema({
    name: String,
    autor: { type: Schema.Types.ObjectId, ref: 'autors' }, 
    etapa: { type: Schema.Types.ObjectId, ref: 'etapa' },
    descripcion: String,
    complejidad: String,
    imagen: { type: String, required: true },
    comentario: String,
    created: {
        type: Date,
        default: Date.now
    }
})

const libroModel = mongoose.model(libroCollection, libroSchema);
export default libroModel;