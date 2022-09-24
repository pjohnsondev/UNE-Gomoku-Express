import { object, string, array, number, date, TypeOf } from "zod";
// TODO: Import User object

const payload = {
    body: object({
        id: string({    
            required_error: "Game id is required",
        }),
        boardSize: number({
            required_error: "Board size is required",
        }),
        winner: string({
            required_error: "Winner is required",
        }),
        date: date({
            required_error: "Winner is required",
        }),
        moves: number({ 
            required_error: "Winner is required",
        }).array()
        // TODO: add playerWhite and PlayerBlack keys with user object value
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

const createParams = {
    params: object({
        boardSize: number({
            required_error: "Board size is required",
        })
    })
}

//schema to create new game in the database
export const createGameSchema = object({
    ...payload,
    ...createParams
});

//schema to update game in database during gameplay
export const updateGameSchema = object({
    ...payload,
    ...updateDeleteParams
});

// schema to delete unfinished game from the database
export const deleteGameSchema = object({
    ...updateDeleteParams
});

// schema to get current game
export const getGameByIdSchema = object({
    ...getParams
});

export type CreateGameInput = TypeOf<typeof createGameSchema>;
export type UpdateGameInput = TypeOf<typeof updateGameSchema>;
export type ReadGameInput = TypeOf<typeof getGameByIdSchema>;
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>;
