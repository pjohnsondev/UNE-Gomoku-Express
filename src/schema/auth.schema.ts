import { object, string, array, number, TypeOf, union } from "zod";

const payload = {
    body: object({
        username: string({    
            required_error: "username is required",
        }),
        password: string({
            required_error: "password is required",
        }),
    })
}


// schema to create new user in the database
export const registerUserSchema = object({
    ...payload,
});

// schema to get user from the database
export const loginSchema = object({
    ...payload
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;