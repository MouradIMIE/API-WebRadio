import express from "express"
import { Router } from "express";
import AdminRoutes from "./admin-routes";
const Routes = Router();

Routes.use('/admin', AdminRoutes);

Routes.get('/test', (req, res) => {
    res.send("Test ok");
})
export default Routes;