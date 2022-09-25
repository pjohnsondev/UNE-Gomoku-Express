import mongoose, {Document, MongooseError} from "mongoose";
import userModel, {UserDocument} from "./user.model";

export interface ActiveGameDocument extends Document {
    gameId: string,
    boardSize: number,
    winner: string,
    date: Date,
    moves: [number]
    playerBlack: UserDocument["_id"],
    playerWhite: UserDocument["_id"]
}

const activeGameSchema = new mongoose.Schema({
    gameId: String,
    boardSize: Number,
    winner: String,
    date: Date,
    moves: [Number],
    playerBlack: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    playerWhite: {type: mongoose.Schema.Types.ObjectId, ref:"User"}
})

export default mongoose.model<ActiveGameDocument>("ActiveGame", activeGameSchema);