import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

import historyRouter from "./router/history.router"
import gameRouter from "./router/game.router"

dotenv.config();

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

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
