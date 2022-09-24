import express, { Request, Response } from "express";
import validateSchema from "../middleware/validateSchema";
import { createGameSchema, deleteGameSchema, getGameByIdSchema, updateGameSchema } from "../schema/game.schema";
import { getAllGames, getGameById } from "../service/game.service";

const gameRouter = express.Router();

// Get ALL Games
gameRouter.get("/", async (req: Request, res: Response) => {
    try {
      const result = await getAllGames();
      return res.status(200).send(result.map(g => ({
        _id: g._id,
        winner: g.winner,
        date: g.date
      })));
    } catch (err) {
      return res.status(500).send(err);
    };
})

// Get Specific Game
// TODO: Potentially pass users to the json res so that users can be displayed in game history also
gameRouter.get("/:gameId", validateSchema(getGameByIdSchema), async (req: Request, res: Response) => {
    const game = await getGameById(req.params.gameId);
    if (!game) {
        return res.sendStatus(404);
    }
    return res.status(200).json({...game});
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