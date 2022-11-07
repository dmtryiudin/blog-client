import {User} from "./fetchSchemas";

export interface AuthData {
    email: string,
    password: string
}

export interface AuthResult{
    error: boolean
    data: User | string
}

export interface AuthResponse {
    token: string,
    userData: User
}

export interface SignUpData {
    email: string;
    password: string;
    name: string;
    extra_details: string;
    skills: string;
    profession: string;
    details: string;
}
