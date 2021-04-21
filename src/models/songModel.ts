import mongoose from "mongoose";

const songschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

const Song = mongoose.model("song",songschema);

export { Song };