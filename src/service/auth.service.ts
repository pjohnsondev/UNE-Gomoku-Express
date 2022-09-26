import mongoose, {DocumentDefinition} from "mongoose";
import userModel, { UserDocument } from "../model/user.model";

export async function getUserByUsername(username: string) {
    return userModel.findOne({ username }).lean();
}

export async function getUserById(id: string) {
    return userModel.findOne({_id: new mongoose.Types.ObjectId(id)}).lean();
}

export async function createUser(user: DocumentDefinition<UserDocument>) {
    return userModel.create(user);
}