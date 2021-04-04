import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';


const AdminRoutes = Router();
AdminRoutes.get('/test', (req, res) => {
    res.send("Test admin routes ok");
    
})

AdminRoutes.post('/register',AdminController.register);
AdminRoutes.post('/login',AdminController.login);
export default AdminRoutes;