import { Router } from 'express';


const AdminRoutes = Router();
AdminRoutes.get('/test', (req, res) => {
    res.send("Test admin routes ok");
    
})
export default AdminRoutes;