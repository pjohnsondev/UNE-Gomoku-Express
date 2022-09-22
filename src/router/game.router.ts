import express, { Request, Response } from "express";
import { request } from "http";

const gameRouter = express.Router();

// Create Game
gameRouter.post("/:gameChoice", (req: Request, res: Response) => {
    const game = req.params
    res.status(200).json(game)
})

// Update game
gameRouter.put("/:id", (req: Request, res: Response) => {
    // TODO: update in storage
    const game = req.params
    res.status(200).json(game)
})

// Delete Game
gameRouter.delete("/id", (req: Request, res: Response) => {
    console.log('Deleted')
    // TODO: delete from storage
    res.status(200);
})

export default gameRouter