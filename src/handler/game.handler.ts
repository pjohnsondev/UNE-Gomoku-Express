import express, { Request, Response } from "express";

import validateSchema from "../middleware/validateSchema";
import { deserializeUser } from "../middleware/deserializeUser";

import { createGameSchema, getGameByIdSchema } from "../schema/game.schema";
import { createGame, getGameById, getAllGamesDataByUser } from "../service/game.service";

const gameHandler = express.Router();
gameHandler.use(deserializeUser); 

// Get all games for current user
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
  
      const games = await getAllGamesDataByUser(userId);

      res.status(200).json(games)
    } catch(err) {
      return res.status(500).send(err);
    }
})

// Get Specific Game
gameHandler.get("/:gameId", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const gameId = req.params.gameId;
      
      // Search for game and match to user ID
      const game = await getGameById(userId, gameId);

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

// Create Game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    const userId = req.userId;
    const game = req.body
    const newGame = await createGame(game);
    return res.status(200).send(newGame);
})

export default gameHandler