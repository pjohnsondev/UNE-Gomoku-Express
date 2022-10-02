import mongoose, {Document, MongooseError} from "mongoose";
import userModel, {UserDocument} from "./user.model";

export interface ActiveGameDocument extends Document {
    gameId: number,
    boardSize: number,
    winner: string,
    date: Date,
    moves: [number]
    userId: UserDocument["_id"]
}

const activeGameSchema = new mongoose.Schema({
    gameId: Number,
    boardSize: Number,
    winner: String,
    date: Date,
    moves: [Number],
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
})

export default mongoose.model<ActiveGameDocument>("ActiveGame", activeGameSchema);