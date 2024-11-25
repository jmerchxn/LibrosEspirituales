import express, { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser } from "../controllers/userController.js";
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

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', validateUserFields, checkEmailExistente, passwordValida, createUser); 
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;