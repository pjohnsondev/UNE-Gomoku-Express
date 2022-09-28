import mongoose, { DocumentDefinition } from 'mongoose';
import ActiveGameModel, {ActiveGameDocument} from '../model/activeGame.model';

export async function getActiveGameById(userId: string, gameId: string) {
    return await ActiveGameModel.find({userId: userId, _id: gameId}).lean();
}

export async function exportCompletedGame(gameId: string){
    return await ActiveGameModel.findById(gameId);
}

export async function createActiveGame(input: DocumentDefinition<ActiveGameDocument>){
    return ActiveGameModel.create(input);
}

export async function updateActiveGame(gameId: string, input: DocumentDefinition<ActiveGameDocument>){
    return ActiveGameModel.findOneAndUpdate(
        {_id: new mongoose.Types.ObjectId(gameId)},
        input,
        {new: true}
    )
}

export async function deletActiveGame(userId: string, gameId: string) {
    return ActiveGameModel.deleteOne({
        userId: userId, 
        _id: new mongoose.Types.ObjectId(gameId)
    })
  }