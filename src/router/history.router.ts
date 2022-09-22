import express, { Request, Response } from "express";

const historyRouter = express.Router();

// Get Games
historyRouter.get("/", (req: Request, res: Response) => {
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

// Get Log of Specific Game
historyRouter.get("/:id", (req:Request, res: Response) => {
    // TODO replace temporary data below with calls to server
    res.status(200).json([
        {
            "_id": 1,
            "boardSize": 9,
            "winner": "white",
            "date": Date, 
            "moves": [10,6,9,8,4,3]
        },
    ])
})

export default historyRouter;