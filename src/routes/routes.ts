import express from "express"
import { Router } from "express";
import AdminRoutes from "./admin-routes";
import songRoutes from "./songs-routes";
const Routes = Router();

Routes.use('/admin', AdminRoutes);
Routes.use('/song',songRoutes);

Routes.get('/test', (req, res) => {
    res.send("Test ok");
})
export default Routes;