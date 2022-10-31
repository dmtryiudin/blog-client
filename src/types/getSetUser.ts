import {User} from "./fetchSchemas";

export interface UsersList {
    pagination: {
        limit: string,
        skip: string,
        total: string
    },

    data: Array<User>
}