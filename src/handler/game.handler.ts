import express, { Request, Response } from "express";

import validateSchema from "../middleware/validateSchema";

import { createGameSchema, getGameByIdSchema } from "../schema/game.schema";
import { createGame, getGameById, getAllGamesDataByUser } from "../service/game.service";

const gameHandler = express.Router();

// Get all games for current user
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
      //TODO: add current user ID below rather than hard code
      const userId = req.body.user;
      console.log(userId)
  
      const games = await getAllGamesDataByUser(userId);

      res.status(200).json(games)
    } catch(err) {
      return res.status(500).send(err);
    }
})

// Get Specific Game
gameHandler.get("/:gameId", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    try {
      const game = await getGameById(req.params.gameId);
      //TODO: add current user ID below rather than hard code
      const userId = "632ee39cf82770bfff38db83"
      if (!game) {
        return res.sendStatus(404);
      } 
      // ensure users can only view their own games
      else if (userId != game.playerBlack && userId != game.playerWhite){
        return res.redirect("/")
      }
      // TODO: Potentially pass users to the json res so that users can be displayed in game history also (e.g. display "Paul v James: Winner James")
      return res.status(200).json({...game});
    } catch (err) {
      return res.status(500).send(err);
    };
})  

// Create Game
gameHandler.post("/", validateSchema(createGameSchema), async (req: Request, res: Response) => {
    const game = req.body
    const newGame = await createGame(game);
    return res.status(200).send(newGame);
})

export default gameHandler