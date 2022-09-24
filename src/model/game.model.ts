import mongoose, { Document } from "mongoose";
import userModel, { UserDocument } from "./user.model";

export interface GameDocument extends Document {
    gameId: number,
    boardSize: number,
    winner: string,
    date: Date,
    moves: [number]
    playerBlack: UserDocument["_id"],
    playerWhite: UserDocument["_id"],
}

const gameSchema = new mongoose.Schema({
    gameId: Number,
    boardSize: Number,
    winner: String,
    date: Date,
    moves: [Number],
    playerBlack: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    playerWhite: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

export default mongoose.model<GameDocument>('Game', gameSchema)