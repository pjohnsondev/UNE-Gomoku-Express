import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import connectDB from "./util/connectDB"
import historyRouter from "./router/history.router"
import gameRouter from "./router/game.router"

dotenv.config();

// connect to the database
connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json())
app.use("/history", historyRouter)
app.use("/game", gameRouter)

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
