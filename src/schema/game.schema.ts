import { object, string, number, array, TypeOf } from "zod";
// TODO: Import User object

const payload = {
    body: object({
        gameId: number({    
            required_error: "Game id is required",
        }),
        boardSize: number({
            required_error: "Board size is required",
        }),
        winner: string({
            required_error: "Winner is required",
        }),
        date: string({
            required_error: "Date is required",
        }),
        moves: array(number({ 
            required_error: "Moves array is required",
        })).nonempty(),
        userId: string({
            required_error: "userId is required",
        })
    })
}

const getParams = {
    params: object({
        gameId: string({
            required_error: "Game id is required",
        })
    })
}

const createGameParams = {
    params: object ({
        gameId: string({
            required_error: "Game id is required",
        })
    })
}


//schema to create new game in the database
export const createGameSchema = object({
    ...payload,
    // ...createGameParams
});

// schema to get game
export const getGameByIdSchema = object({
    ...getParams
});

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameByIdSchema>;
