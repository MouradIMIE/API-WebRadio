import express from "express"
import { Router } from "express";
import AdminRoutes from "./admin-routes";
const Routes = Router();

// // middleware before every request
// express.Router().use((req, res, next) => {
//     console.log('Time: ', Date.now());
//     next();
// });

Routes.use('/admin', AdminRoutes);

Routes.get('/test', (req, res) => {
    res.send("Test ok");
})
export default Routes;