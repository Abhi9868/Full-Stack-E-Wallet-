import express from 'express';
import {
    register,
    login,
    logout,
    profile,
    getAllUsers,
} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);
router.get('/users', authMiddleware, getAllUsers);


export default router;
