export type AuthenticationData = {
    id: string
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
};

export type SignupInputDTO = {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
};

export type LoginInputDTO = {
    email: string,
    password: string
};