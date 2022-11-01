import axios, {AxiosError} from "axios";
import {Comment} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";
import {CommentRes} from "../types/commentsTypes";

export const URL:string = 'http://test-blog-api.ficuslife.com/api/v1'
let token: string | null = localStorage.getItem('token')

if (token){
    token = JSON.parse(token)
}

export const comments = {
    async getCommentsForPost(id:string):Promise<Comment[]>{
        try{
            return (await axios.get(`${URL}/comments/post/${id}`)).data
        }
        catch (err: AxiosError | any){
            return err
        }
    },

    async addComment(id:string | undefined, commentText:string):Promise<CommentRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: commentText
            }

            const fetchData:Comment = (await axios.post(`${URL}/comments/post/${id}`, data, config)).data
            return {
                error: false,
                data: fetchData
            }
        }
        catch(err:AxiosError | any){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async deleteComment(id:string | undefined): Promise<void>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.delete(`${URL}/comments/${id}`, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async replyToComment(postId:string | undefined, followedComment:string | undefined, commentText:string):Promise<CommentRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: commentText,
                followedCommentID: followedComment
            }

            const fetchData:Comment = (await axios.post(`${URL}/comments/post/${postId}`, data, config)).data

            return {
                error: false,
                data: fetchData
            }
        }
        catch(err:AxiosError | any){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async editComment(id:string | undefined, text:string):Promise<CommentRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: text
            }

            const fetchData:Comment = (await axios.patch(`${URL}/comments/${id}`, data, config)).data

            return {
                error: false,
                data: fetchData
            }
        }
        catch (err:AxiosError | any){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async setLike(id:string | undefined):Promise<void>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.put(`${URL}/comments/like/${id}`, {}, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    }
}