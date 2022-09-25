import 'dotenv/config';
import connect from './connectDB';

import UserModel from "../model/user.model";
import users from "../data/users.json";

import GameModel from '../model/game.model';
import games from '../data/games.json';

import ActiveGameModel from '../model/activeGame.model';
import activeGames from '../data/activeGame.json';

const run = async () => {
  try {
    await connect();
    
    console.log("bootstrapDB");
    
    await UserModel.deleteMany();
    await UserModel.create(users);

    await GameModel.deleteMany();
    await GameModel.insertMany(games);

    await ActiveGameModel.deleteMany();
    await ActiveGameModel.insertMany(activeGames);

    process.exit(0)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

run(); 