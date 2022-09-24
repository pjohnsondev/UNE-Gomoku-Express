import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, deleteGameSchema, getGameSchema, updateGameSchema } from "../schema/game.schema";

const gameRouter = express.Router();

gameRouter.get("/:id", validateSchema(getGameSchema), (req: Request, res: Response) => {
    const game = req.params;
    res.status(200).json(game)
})  

// Create Game
gameRouter.post("/:gameChoice", validateSchema(createGameSchema), (req: Request, res: Response) => {
    const game = req.params
    res.status(200).json(game)
})

// Update game
gameRouter.put(":id", validateSchema(updateGameSchema), (req: Request, res: Response) => {
    // TODO: update in storage
    const game = req.params
    res.status(200).json(game)
})

// Delete Game
gameRouter.delete("/:id", validateSchema(deleteGameSchema), (req: Request, res: Response) => {
    console.log('Deleted')
    // TODO: delete from storage
    res.status(200);
})

export default gameRouter