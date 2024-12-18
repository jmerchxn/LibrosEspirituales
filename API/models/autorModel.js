import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const autorCollection = 'autors';

const autorSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true  
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const autorModel = mongoose.model(autorCollection, autorSchema);
export default autorModel;

