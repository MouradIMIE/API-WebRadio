import express from "express"
import { Router } from "express";
import AdminRoutes from "./admin-routes";
const routes = Router();

// middleware before every request
express.Router().use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

routes.use('/admin', AdminRoutes);

export default routes;