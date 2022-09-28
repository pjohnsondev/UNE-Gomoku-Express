import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';
import GameModel, { GameDocument } from '../model/game.model';

export async function getGameById(userId: string, gameId: string) {
    return await GameModel.find({userId: userId, _id: gameId}).lean();
} 

export async function getAllGamesDataByUser(userId: string){
    return await GameModel.find({userId}).lean();
}

export async function createGame(input: DocumentDefinition<GameDocument>){
    return GameModel.create(input);  
}

export async function getGameByFilter(query: FilterQuery<GameDocument>) {
    return await GameModel.find(query).lean();
  }