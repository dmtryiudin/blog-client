import {Comment} from "./fetchSchemas";

export interface CommentRes {
    error: boolean,
    data: Comment | string
}