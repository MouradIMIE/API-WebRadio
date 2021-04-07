import express, { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';
import { config } from "dotenv";
import { adminInterface } from "../interfaces/adminInterface";
import { Admin } from "../models/adminModel";

config();

const JWT_KEY: string = process.env.JWT_KEY as string;

const middleware: express.Application = express();

middleware.use(async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        //Récupération du token
        const token = req.header('Authorization')?.replace('Bearer','').trim() as string;
        if(!token) throw new Error ('Vous n\'avez pas les droit nécessaire pour accèder a cette ressource');
        
        //Vérification du token et des informations contenues
        const data:any = jsonwebtoken.verify(token,JWT_KEY);
        console.log(data.admin);
        if(!data || !data.email || !data._id) throw new Error('Vous n\'avez pas les droit nécessaire pour accèder a cette ressource');

        //Récupération de l'admin pour le mettre dans le req
        const admin : adminInterface | undefined = await Admin.findOne({email:data.email});
        if(!admin) throw new Error('Vous n\'avez pas les droit nécessaire pour accèder a cette ressource');
        Object.assign(req,{admin});
        
        //Si tout vas bien on passe au controller
        next();


    }
    catch(error){
        if (error === "Vous n\'avez pas les droit nécessaire pour accèder a cette ressource") {
            res.status(400).send({
                error: true,
                message: "Vous n\'avez pas les droit nécessaire pour accèder a cette ressource"
            });
        }
    }
});

export { middleware as authMiddleware };