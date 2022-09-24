import express, { Request, Response } from "express";
import { request } from "http";
import validateSchema from "../middleware/validateSchema";
import { createUserSchema, getUserSchema } from "../schema/user.shema";

const userHandler = express.Router();

// Create User
userHandler.post("/signup", validateSchema(createUserSchema), (req: Request, res: Response) => {
    const user = req.params;
    res.status(200).json(user.username)
})  

// Get User
userHandler.get("/login", validateSchema(getUserSchema), (req: Request, res: Response) => {
    const user = req.params;
    res.status(200).json(user.name)
})

//TODO: Add ability to update user
// Update User

// TODO: Add ability tofor user to delete account
// Delete User

export default userHandler;