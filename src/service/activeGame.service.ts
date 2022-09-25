import mongoose, { DocumentDefinition, FilterQuery } from 'mongoose';
import activGameModel from '../model/activGame.model';
import ActiveGameModel, {ActiveGameDocument} from '../model/activGame.model';

export async function getActiveGameById(gameId: string){
    return await ActiveGameModel.findById(gameId);
}

export async function exportCompletedGame(gameId: string){
    return await ActiveGameModel.findById(gameId);
}

export async function createActiveGame(input: DocumentDefinition<ActiveGameDocument>){
    return ActiveGameModel.create(input);
}

export async function updateActiveGame(gameId: string, input: DocumentDefinition<ActiveGameDocument>){
    return activGameModel.findOneAndUpdate(
        {_id: new mongoose.Types.ObjectId(gameId)},
        input,
        {new: true}
    )
}