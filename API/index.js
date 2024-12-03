import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import db from "./config/db.js";
import cors from "cors";
dotenv.config();



const port = process.env.PORT || 3000;
const app = express();
app.use( express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// La vista de la API
app.get('/', (req, res) => {
    res.status(200).send('<h1> API </h1>');
})

//la conexión con el puerto
routerAPI(app);
app.listen( port, () => { 
    console.log(`Servidor en el ${port}`)
}) ;