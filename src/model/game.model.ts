import mongoose, { Document } from "mongoose";
import userModel, { UserDocument } from "./user.model";

// TODO: Consider breaking the game model into smaller models

export interface GameDocument extends Document {
    gameId: number,
    boardSize: number,
    winner: string,
    date: Date,
    moves: [number] 
    userId: UserDocument["_id"],
}

const gameSchema = new mongoose.Schema({
    gameId: Number,
    boardSize: Number,
    winner: String,
    date: Date,
    moves: [Number],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

export default mongoose.model<GameDocument>('Game', gameSchema)