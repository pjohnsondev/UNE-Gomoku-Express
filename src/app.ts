import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import connectDB from "./util/connectDB"
import gameHandler from "./handler/game.handler"
import activeGameHandler from "./handler/activeGame.handler"
import authHandler from "./handler/auth.handler"

dotenv.config();

// connect to the database
connectDB();

const app: Express = express();
const port = process.env.PORT;

// The decision to create a seperate active game handler was made to allow the possibility of multiple active games being performed at once
app.use(express.json())
app.use("/game", gameHandler)
app.use("/active", activeGameHandler)
app.use("/auth", authHandler)

mongoose.connection.once('connected', () => {
    console.log('⚡️[server]: Connected to MongoDB.');
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
      });
})
