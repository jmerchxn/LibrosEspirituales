import express, { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUserById, loginUser,  toggleFavorite, getUserFavoritos, } from "../controllers/userController.js";
import jwt from "jsonwebtoken";
import { validateUserFields, checkEmailExistente, passwordValida } from "../validations/validations.js";
const router = express.Router();

const auth = (req, res, next) => {
    const headersToken = req.headers.authorization;
    
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJjaHVreUBnbWFpbC5jb20iLCJpYXQiOjE3MjY3MDI2ODUsImV4cCI6MTcyNjcwNjI4NX0.JGKKG6ss4KqfhC1cFu3qKdFClGAnK3YpU8scDrxmIWc"
    if(headersToken){
        const token = headersToken.split(" ")[1];
        const secretKey = "clavesupersecreta";

        jwt.verify((token, secretKey, (err, payload) => {
            if(err){
                connsole.log(err)
            }
            console.log(payload)
            next()
        }))

    }else{
        res.status(401)
    }
}

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/create', validateUserFields, checkEmailExistente, passwordValida, createUser); 
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);
router.get('/:id/favoritos', getUserFavoritos); // Obtener favoritos del usuario
router.post('/:id/favoritos', toggleFavorite); // Agregar un libro a los favoritos
router.delete('/:id/favoritos/:bookId', toggleFavorite); // Eliminar un libro de los favoritos

export default router;