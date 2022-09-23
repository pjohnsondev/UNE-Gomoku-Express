// TODO: Lok into schema used with mongoose and decide if this is a necessary schema

import { object, string, array, number, date, TypeOf } from "zod";

const payload = {
    // TODO: setup Payload
    body: object({
        username: string({    
            required_error: "Game id is required",
        }),
        password: string({
            required_error: "Board size is required",
        }),
        email: string(),
        userGames: number({
            required_error: "Games array is required",
        }).array(),
    })
}

const getParams = {
    params: object({
        username: number({
            required_error: "Username is Required",
        }),
        password: string({
            required_error: "Password is Required"
        }),
        email: string(),
        userGames: number({
            required_error: "Games array is required"
        })
    })
}

const createParams = {
    params: object({
        username: number({
            required_error: "Username is Required",
        }),
        password: string({
            required_error: "Password is Required"
        }),
        email: string(),
    })
}

const updateDeleteParams = {
    params: object({
        username: number({
            required_error: "Username is Required",
        }),
        password: string({
            required_error: "Password is Required"
        }),
        email: string(),
    })
}

// schema to create new user in the database
export const createUserSchema = object({
    ...payload,
    ...createParams
});

// schema to get user from the database
export const getUserSchema = object({
    ...getParams
});

// schema to update user in the database
export const updateUserSchema = object({
    ...payload,
    ...updateDeleteParams
});

// schema to delete user from database
export const deleteUserSchema = object({
    ...updateDeleteParams
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type getUserInput = TypeOf<typeof getUserSchema>;
export type updateUserInput = TypeOf<typeof updateUserSchema>;
export type deleteUserInput = TypeOf<typeof deleteUserSchema>;