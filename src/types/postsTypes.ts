import {Post} from "./fetchSchemas";

export interface PostsList {
    pagination: {
        limit: string,
        skip: string,
        total: string
    },

    data: Array<Post>
}

export interface PostRes {
    error: boolean,
    data: Post | string
}

export interface UpdatePost{
    title: string,
    fullText: string,
    description: string
}