import { Response } from "express";

export class SongException {

    static getSongResponse = (error: string, res: Response): Response => {

        if (error === "Des données sont manquantes") {
            res.status(400).send({
                error: true,
                message: error
            });
            return res;
        }
        if (error === "Ce son a déjà été ajouté") {
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