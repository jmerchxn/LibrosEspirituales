import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const usersFilePath = path.join(path.dirname(__filename), '../data/users.json');

const readUsersFile = () => {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
}

const writeUsersFile = (data) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(data), 'utf8')
}

export {readUsersFile, writeUsersFile};
import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Definimos la colleccion
const userCollection = 'users';

const userSchema = new Schema({
    name: String,
    completed: Boolean,
    created: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model(userCollection, userSchema);
export default userModel;