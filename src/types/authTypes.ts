import {User} from "./fetchSchemas";

export interface AuthData {
    email: string,
    password: string
}

export interface AuthRes{
    error: boolean
    data: User | string
}

export interface UserFetchResponse{
    data: {
        token:string,
    }
}

export interface SignUpData {
    email: string,
    password: string,
    name: string,
    extra_details: string,
    skills: string,
    profession: string,
    details: string
}