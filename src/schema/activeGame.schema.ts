import { object, string, number, date, TypeOf } from "zod";
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
        moves: number({ 
            required_error: "Moves array is required",
        }).array(),
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

const createParams = {
    params: object ({
        gameId: string({
            required_error: "Game id is required",
        })
    })
}

//schema to create new active game in the database
export const createActiveGameSchema = object({
    ...payload,
    ...createParams
});

// schema to get current active game
export const getActiveGameByIdSchema = object({
    ...getParams
});

//schema to update active game in database during gameplay
export const updateActiveGameSchema = object({
    ...payload,
    ...updateDeleteParams
});

// schema to delete unfinished game from the database
export const deleteActiveGameSchema = object({
    ...updateDeleteParams
});

export type CreateActiveGameInput = TypeOf<typeof createActiveGameSchema>;
export type ReadActiveGameInput = TypeOf<typeof getActiveGameByIdSchema>;
export type UpdateActiveGameInput = TypeOf<typeof updateActiveGameSchema>;
export type DeleteActiveGameInput = TypeOf<typeof deleteActiveGameSchema>;