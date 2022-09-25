import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import connectDB from "./util/connectDB"
import gameHandler from "./handler/game.handler"
import userHandler from "./handler/user.handler"
import activeGameHandler from "./handler/activeGame.handler"

dotenv.config();

// connect to the database
connectDB();

const app: Express = express();
const port = process.env.PORT;

// The decision to create a seperate active game handler was made to allow the possibility of multiple active games being performed at once
app.use(express.json())
app.use("/api/game", gameHandler)
app.use("/api/user", userHandler)
app.use("/api/active", activeGameHandler)

app.get('/', (req: Request, res: Response) => {
    res.send("Great Success");
});
app.get("/login", (req: Request, res: Response) =>{
    res.send("login")
});
app.get("/game/:gameChoice", (req: Request, res: Response) =>{
    res.send("game choice")
}); 

mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      });
})
