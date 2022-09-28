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
  const userId = req.userId;  
  const game = req.body;
  const newActiveGame = await createActiveGame(game)
  res.status(200).json(newActiveGame)
})

// Get Active Game
activeGameHandler.get("/:gameId", async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const gameId = req.params.gameId;

        // Search for game and match to user ID
        const game = await getActiveGameById(userId, gameId);
        
        // send error if no game exists
        if (!game) {
          return res.sendStatus(404);
        } 

        //return game
        return res.status(200).json({...game});
      } catch (err) {
        return res.status(500).send(err);
      };
})

// Update game
activeGameHandler.put("/:gameId", validateSchema(updateActiveGameSchema), async (req: Request, res: Response) => {
  
  try {
    const userId = req.userId
    const gameId = req.params.gameId;
    const game = req.body;

    // Get the game from the database and ensure game belongs to user
    const existingGame = await getActiveGameById(userId, gameId)

    // Check that move doesn't already exist
    const existingMoves = existingGame.map(b => (b.moves)).flat();
    if(existingMoves?.includes(game.moves[game.moves.length-1])){
        res.status(400).send("move already exists");
    }

    // Update the game in the database
    const newActiveGame = await updateActiveGame(gameId, game)
    res.status(200).json(newActiveGame)
    
  } catch (err) {
    res.status(500).send(err)
  }
})

// Delete Game
activeGameHandler.delete("/:gameId", validateSchema(deleteActiveGameSchema), async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const gameId = req.params.gameId;

    // check that user owns active game then delete
    await deletActiveGame(userId, gameId);
    res.status(200).send("deleted");
  } catch (err) {
    res.status(500).send(err);
  }
})

export default activeGameHandler