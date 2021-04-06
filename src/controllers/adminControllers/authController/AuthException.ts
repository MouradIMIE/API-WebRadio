import { Response } from "express";

export class AuthException {

    static getAuthResponse = (error: string, res: Response): Response => {

        // ************ ERREUR DE DONNEES ****************//

        if (error === "Des données sont manquantes") {
            res.status(400).send({
                error: true,
                message: error
            });
            return res;
        }

        if (error === "Le mot de passe n'est pas correct") {
            res.status(400).send({
                error: true,
                message: "Le mot de passe n'est pas correct"
            });
        }

        //********* ERREUR EMAIL ****************//
        if (error === "Le format de l'email n'est pas valide") {
            res.status(400).send({
                error: true,
                message: error
            });
            return res;
        }

        if (error === "Cet email existe déjà") {
            res.status(400).send({
                error: true,
                message: error
            });
            return res;
        }

        if (error === "Cet email n'est associé à aucun compte") {
            res.status(400).send({
                error: true,
                message: "Cet email n'est associé à aucun compte"
            });
        }

        // ********* ERREUR ACCESS ****************//
        if (error === "Vous n'avez pas accès a cette fonctionnalité") {
            res.status(400).send({
                error: true,
                message: error
            });
            return res;
        }

        // ********* DEFAULT *********//
        res.status(400).send({
            error: true,
            message: "error"
        });
        return res;
    }
}