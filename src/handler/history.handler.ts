/*
    Todo: This may be an unneccessary route. Look into further
*/


import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";

const historyHandler = express.Router();

// Get Games
historyHandler.get("/", (req: Request, res: Response) => {
    // TODO replace temporary data below with calls to server
    res.status(200).json([
        {
            "_id": 1,
            "winner": "white",
            "date": Date, 
        },
        {
            "_id": 2,
            "winner": "Black",
            "date": Date, 
        },
    ])
})

export default historyHandler;