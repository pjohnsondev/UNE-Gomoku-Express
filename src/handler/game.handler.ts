import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, deleteGameSchema, getGameByIdSchema, updateGameSchema } from "../schema/game.schema";
import { getAllGames, getGameById, getAllGamesDataByUser } from "../service/game.service";

const gameHandler = express.Router();

// Get all games for current user
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
      //TODO: add current user ID below rather than hard code
      const userId = "632ee39cf82770bfff38db83"

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
      } else if (userId !== game.playerBlack || userId !== game.playerWhite){
        return res.redirect("/")
      }
      // TODO: Potentially pass users to the json res so that users can be displayed in game history also (e.g. display "Paul v James: Winner James")
      return res.status(200).json({...game});
    } catch (err) {
      return res.status(500).send(err);
    };
})  

// Create Game
gameHandler.post("/:gameChoice", validateSchema(createGameSchema), (req: Request, res: Response) => {
    const game = req.params
    res.status(200).json(game)
})

// Update game
gameHandler.put(":id", validateSchema(updateGameSchema), (req: Request, res: Response) => {
    // TODO: update in storage
    const game = req.params
    res.status(200).json(game)
})

// Delete Game
gameHandler.delete("/:id", validateSchema(deleteGameSchema), (req: Request, res: Response) => {
    console.log('Deleted')
    // TODO: delete from storage
    res.status(200);
})

export default gameHandler