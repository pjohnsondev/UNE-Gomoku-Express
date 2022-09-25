import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, deleteGameSchema, getGameByIdSchema, updateGameSchema } from "../schema/game.schema";
import { getGameById, getAllGamesDataByUser } from "../service/game.service";

const activeGameHandler = express.Router();

// Create Game
activeGameHandler.post("/:gameChoice", validateSchema(createGameSchema), (req: Request, res: Response) => {
    //TODO: add current user ID below rather than hard code
   const userId = "632ee39cf82770bfff38db83"
   const game = req.params
   res.status(200).json(game)
})

// Update game
activeGameHandler.put("/:gameId", validateSchema(updateGameSchema), (req: Request, res: Response) => {
    // TODO: update in storage
    const game = req.params
    res.status(200).json(game)
})

// Delete Game
activeGameHandler.delete("/:gameId", validateSchema(deleteGameSchema), (req: Request, res: Response) => {
    console.log('Deleted')
    // TODO: delete from storage
    res.status(200);
})

export default activeGameHandler