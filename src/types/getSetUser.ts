import {User} from "./fetchSchemas";

export interface UsersList {
    pagination: {
        limit: string,
        skip: string,
        total: string
    },

    data: Array<User>
}

export interface UpdateUserData {
    name: string,
    extra_details: string,
    skills: string,
    profession: string,
    details: string,
}