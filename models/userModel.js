import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const userCollection = 'users';

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;