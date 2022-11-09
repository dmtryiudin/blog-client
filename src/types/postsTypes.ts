import {Post} from "./fetchSchemas";
import {Comment} from "./fetchSchemas";

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

export interface PostWithComments {
    _id: string,
    title: string,
    fullText: string,
    description: string,
    dateCreated: string,
    image: string,
    likes: Array<string>,
    postedBy: string,
    comments: Array<Comment>
}