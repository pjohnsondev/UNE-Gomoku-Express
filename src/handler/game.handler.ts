import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, deleteGameSchema, getGameByIdSchema, updateGameSchema } from "../schema/game.schema";
import { getAllGames, getGameById } from "../service/game.service";

const gameHandler = express.Router();

// Get ALL Games
gameHandler.get("/", async (req: Request, res: Response) => {
    try {
      const result = await getAllGames();
      //TODO: add current user ID below rather than hard code
      const userId = "632ee39cf82770bfff38db83"
      return res.status(200).send(result.map(g => (g.playerBlack == userId || g.playerWhite == userId) ?
        {
          _id: g._id,
          winner: g.winner,
          date: g.date
        }
       : null));
    } catch (err) {
      return res.status(500).send(err);
    };
})

// Get Specific Game
// TODO: Potentially pass users to the json res so that users can be displayed in game history also
gameHandler.get("/:gameId", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    const game = await getGameById(req.params.gameId);
    if (!game) {
        return res.sendStatus(404);
    }
    return res.status(200).json({...game});
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