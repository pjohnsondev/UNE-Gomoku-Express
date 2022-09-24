import mongoose, { Document } from "mongoose";
import userModel, { UserDocument } from "./user.model";

// TODO: Consider breaking the game model into smaller models

export interface GameDocument extends Document {
    gameId: string,
    boardSize: number,
    winner: string,
    date: Date,
    moves: [number]
    playerBlack: UserDocument["_id"],
    playerWhite: UserDocument["_id"],
}

const gameSchema = new mongoose.Schema({
    gameId: String,
    boardSize: Number,
    winner: String,
    date: Date,
    moves: [Number],
    playerBlack: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    playerWhite: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

export default mongoose.model<GameDocument>('Game', gameSchema)