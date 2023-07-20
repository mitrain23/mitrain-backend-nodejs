import express from "express";
import UserController from "../controllers/userController";


const router= express.Router();

router.get('', (req, res) => {
    res.status(200).json('api ready');
})
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);




export default router


