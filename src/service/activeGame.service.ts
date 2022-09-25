import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';
import ActiveGameModel from '../model/activGame.model';
import GameModel from '../model/game.model';

export async function getActiveGameById(gameId: string){
    return await ActiveGameModel.findById(gameId);
}

export async function exportCompletedGame(gameId: string){
    return await GameModel.findById(gameId);
}