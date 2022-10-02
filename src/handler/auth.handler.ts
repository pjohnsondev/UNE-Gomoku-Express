import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import validateSchema from "../middleware/validateSchema";
import { createUser, getUserById, getUserByUsername } from "../service/auth.service";
import {
    LoginInput,
    RegisterUserInput,
    registerUserSchema
} from "../schema/auth.schema"
import { signJwt } from "../util/jwt";
import { readdirSync } from "fs";

const authHandler = express.Router();

authHandler.post("/register", async (req: Request<{}, {}, RegisterUserInput["body"]>, res: Response) => {
    try{
        const {username, password} = req.body;

        //check if user exists and validate if exists
        const existingUser = await getUserByUsername(username);

        if(existingUser){
            return res.status(400).send("User already exists. Please login")
        }

        // encrypt password
        const encyptedPassword = await bcrypt.hash(password, 10);

        //Create the user in the database
        const newUser = await createUser({
            username,
            password: encyptedPassword,
        })

        // create token
        const token = signJwt({username, _id: newUser._id});

        // return new user with the above token
        res.status(200).json({ _id: newUser._id, token });

    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
})

authHandler.post("/login", async ( req: Request<{}, {}, LoginInput["body"]>, res: Response) => {
    try{
        // get the user input
        const {username, password } = req.body;

        // validate user if they exist
        const user = await getUserByUsername(username);

        // check passwords match
        if(user && (await bcrypt.compare(password, user.password))){
            // create token
            const token = signJwt( {username, _id: user._id});

            // return the user
            return res.status(200).json({_id: user._id, token, username: username})
        }

        // let user know if username or password are invalid
        res.status(400).send("Username or Password are Invalid")
    } catch (err) {
        return res.status(500).send(err);
    }
})

export default authHandler;
