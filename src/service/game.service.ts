import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';
import GameModel, { GameDocument } from '../model/game.model';

export async function getGameById(id: string) {
    return await GameModel.findById(id).lean();
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

export async function createGame(input: DocumentDefinition<GameDocument>){
    return GameModel.create(input); 
}