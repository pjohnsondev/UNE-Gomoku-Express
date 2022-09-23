import express, { Request, Response } from "express";
import { request } from "http";
import validateSchema from "../middleware/validateSchema";
import { createUserSchema, getUserSchema } from "../schema/user.shema";

const userRouter = express.Router();

// Create User
userRouter.post("/signup", validateSchema(createUserSchema), (req: Request, res: Response) => {
    const user = req.params;
    res.status(200).json(user.username)
})  

// Get User
userRouter.get("/login", validateSchema(getUserSchema), (req: Request, res: Response) => {
    const user = req.params;
    res.status(200).json(user.name)
})

//TODO: Add ability to update user
// Update User

// TODO: Add ability tofor user to delete account
// Delete User