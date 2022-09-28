import { object, string, number, array, TypeOf } from "zod";


const payload = { 
    body: object({
        gameId: string({    
            required_error: "Game id is required",
        }),
        boardSize: number({
            required_error: "Board size is required",
        }),
        date: string({
            required_error: "Date is required",
        }),
        moves: array(number({ 
            required_error: "Moves array is required",
        })),
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