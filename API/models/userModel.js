import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const userCollection = 'users';

const userSchema = new Schema({
    name: String,
    lastname: String,
    username:String,
    email: String,
    password: String,
    favoritos: [{ type: Schema.Types.ObjectId, ref: 'libros',default: [] }], 
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
}, { strict: false })

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;