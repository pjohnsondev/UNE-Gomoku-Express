import express, { Request, Response } from "express";

import validateSchema from "../middleware/validateSchema";
import { deserializeUser } from "../middleware/deserializeUser";

import { createActiveGameSchema, deleteActiveGameSchema, getActiveGameByIdSchema, updateActiveGameSchema } from "../schema/activeGame.schema";
import { createActiveGame, getActiveGameById, updateActiveGame, deletActiveGame } from "../service/activeGame.service";

const activeGameHandler = express.Router();
activeGameHandler.use(deserializeUser);

// Redirect empty get request
activeGameHandler.get("/", (req: Request, res: Response) => {
    res.redirect("/")
})

// Create Game
activeGameHandler.post("/:gameId", validateSchema(createActiveGameSchema), async (req: Request, res: Response) => {
    const game = req.body;
    const newActiveGame = await createActiveGame(game)
    res.status(200).json(newActiveGame)
})

// Get Active Game
activeGameHandler.get("/:gameId", async (req: Request, res: Response) => {
    try {
        const game = await getActiveGameById(req.params.gameId);
        
        const userId = req.userId;
        console.log(userId)
        if (!game) {
          return res.sendStatus(404);
        } 
        // ensure users can only view their own games
      else if (userId != game.playerBlack && userId != game.playerWhite){
        return res.redirect("/")
      }
        return res.status(200).json({...game});
      } catch (err) {
        return res.status(500).send(err);
      };
})

// Update game
activeGameHandler.put("/:gameId", validateSchema(updateActiveGameSchema), async (req: Request, res: Response) => {
    // TODO: update in storage
    const userId = "632ee39cf82770bfff38db83"
    const gameId = req.params.gameId;
    const game = req.body;

    // Ensure tile isn't already occupied in moves
    const existingGame = await getActiveGameById(gameId)
    const existingMoves = existingGame?.moves;
    if(existingMoves?.includes(game.moves[game.moves.length-1])){
        res.sendStatus(400);
    }

    // Update the game in the database
    const newActiveGame = await updateActiveGame(gameId, game)
    res.status(200).json(newActiveGame)
})

// Delete Game
activeGameHandler.delete("/:gameId", validateSchema(deleteActiveGameSchema), async (req: Request, res: Response) => {
    const gameId = req.params.gameId;
    await deletActiveGame(gameId);
    res.status(200);
})

export default activeGameHandler