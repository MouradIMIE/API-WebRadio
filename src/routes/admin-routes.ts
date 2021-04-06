import { Router } from 'express';
import { AuthController } from '../controllers/adminControllers/authController/AuthController';


const AdminRoutes = Router();
AdminRoutes.get('/test', (req, res) => {
    res.send("Test admin routes ok");
    
})

AdminRoutes.post('/register', AuthController.register);
AdminRoutes.post('/login', AuthController.login);
AdminRoutes.get('/forgot-password', AuthController.forgotPassword);
export default AdminRoutes;