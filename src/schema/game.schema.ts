import { object, string, number, array, date, TypeOf } from "zod";
// TODO: Import User object

const payload = {
    body: object({
        gameId: string({    
            required_error: "Game id is required",
        }),
        boardSize: number({
            required_error: "Board size is required",
        }),
        winner: string({
            required_error: "Winner is required",
        }),
        date: date({
            required_error: "Date is required",
        }),
        moves: array(number({ 
            required_error: "Moves array is required",
        })).nonempty(),
        playerWhite: string({
            required_error: "White player userId is required",
        }),
        playerBlack: string({
            required_error: "Black player userId is required",
        }),
    })
}

const getParams = {
    params: object({
        gameId: string({
            required_error: "Game id is required",
        })
    })
}

const updateDeleteParams = {
    params: object ({
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
    ...createGameParams
});

//schema to update game in database during gameplay
export const updateGameSchema = object({
    ...payload,
    ...updateDeleteParams
});

// schema to get current game
export const getGameByIdSchema = object({
    ...getParams
});

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameByIdSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
