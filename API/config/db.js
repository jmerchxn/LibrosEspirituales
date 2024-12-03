import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// conexión con la bd
mongoose.connect(  process.env.DB_URI );
const db = mongoose.connection;

db.on('error', ( error) =>{
    console.error(error);
});

db.once('open', ( ) =>{
    console.info('Conexion con la  DB Correcta!');
});

export default db;