export type AuthenticationData = {
    id: string
}

export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    nickname: string,
    password: string
};

export type SignupInputDTO = {
    firstName: string,
    lastName: string,
    nickname: string,
    email: string,
    password: string
};

export type LoginInputDTO = {
    email: string,
    password: string
};