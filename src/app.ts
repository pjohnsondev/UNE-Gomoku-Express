import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import connectDB from "./util/connectDB"
import historyHandler from "./handler/history.handler"
import gameHandler from "./handler/game.handler"
import userHandler from "./handler/user.handler"
import activeGameHandler from "./handler/activeGame.handler"

dotenv.config();

// connect to the database
connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use("/history", historyHandler)
app.use("/game", gameHandler)
app.use("/user", userHandler)
app.use("/active", activeGameHandler)

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
