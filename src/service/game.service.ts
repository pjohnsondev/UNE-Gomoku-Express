import mongoose, { FilterQuery } from 'mongoose';
import GameModel from '../model/game.model';

export async function getAllGames() {
  return await GameModel.find().lean();
}

export async function getAllGamesDataByUser(userId: string){
    return await GameModel.aggregate([
        // filter with for user matching playerBlack or playerWhite
        {
            $match: { 
                $or: [
                    { playerWhite: new mongoose.Types.ObjectId(userId) },
                    { playerBlack: new mongoose.Types.ObjectId(userId) }
                ]
            }
        },
        // transform the return with $project
        {
            $project: {
                gameId: 1,
                date: 1,
                winner: 1
            }
        },
    ])

}

export async function getGameById(id: string) {
  return await GameModel.findById(id).lean();
}