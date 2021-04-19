import express, { Request, Response } from "express";
import songInterface from "../../interfaces/songInterface";
import { Song } from "../../models/songModel";
import { SongException } from "./SongException";


export class SongController {

    // -------------------------------------------------AddSong---------------------------------------------------//
    static addSong = async (req: Request, res: Response) => {
        const body: songInterface = req.body;

        if (!body.title || !body.genre || !body.album || !body.url || !body.time || !body.artist) {
            res = SongException.getSongResponse("Des données sont manquantes", res);
            return;
        }

        const song = await Song.create({
            title: body.title,
            artist: body.artist,
            album: body.album,
            url : body.url,
            genre: body.genre,
            time: body.time,
        })

        res.status(200).send({
            error:false,
            message:"Le son a été ajouté avec succès",
            song:{
                title:song.title,
                time: song.time,
            }
        })
    };
    
}