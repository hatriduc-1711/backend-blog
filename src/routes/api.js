import express from 'express';
import { authController } from '../controllers/authController.js'
import { userController } from '../controllers/userController.js';
import { middlewareController } from '../controllers/middlewareController.js';
const router = express.Router();

export const routes = (app) => {
    // user
    router.get('/get-all-posts', userController.getAllPosts)
    router.get('/get-posts', middlewareController.verifyToken, userController.getPosts)
    router.post('/create-posts', middlewareController.verifyToken, userController.createPosts)
    router.put('/update-view', middlewareController.verifyToken, userController.updateView)

    // auth 
    router.post('/register', authController.handleRegister)
    router.post('/login', authController.handleLogin)
    router.post('/refresh', authController.refreshToken)
    router.post('/logout', middlewareController.verifyToken, authController.logout)
    return app.use('/api/blog', router)
}