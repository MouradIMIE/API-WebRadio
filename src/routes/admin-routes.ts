import { Router } from 'express';
import { AuthController } from '../controllers/adminControllers/authController/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';


const AdminRoutes = Router();
AdminRoutes.get('/test', (req, res) => {
    res.send("Test admin routes ok");
    
})

AdminRoutes.post('/register', AuthController.register);
AdminRoutes.post('/login', AuthController.login);
AdminRoutes.get('/forgot-password', AuthController.forgotPassword);
AdminRoutes.delete('/logout',[authMiddleware],AuthController.disconnect)
AdminRoutes.delete('/delete',[authMiddleware],AuthController.delete)
export default AdminRoutes;