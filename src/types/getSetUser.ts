import {Post, User} from "./fetchSchemas";

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

export interface UserWithPosts {
    _id: string,
    email: string,
    name: string,
    avatar:	string,
    extra_details: string,
    skills:	string,
    profession:	string,
    details: string,
    dateCreated: string,
    posts: Array<Post>
}