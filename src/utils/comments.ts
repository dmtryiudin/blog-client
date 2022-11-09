import axios, {AxiosError} from "axios";
import {Comment} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";
import {CommentRes} from "../types/commentsTypes";

const URL_BFF:string = 'http://localhost:3001'
let token: string | null = localStorage.getItem('token')

if (token){
    token = JSON.parse(token)
}

export const comments = {
    async addComment(id:string | undefined, commentText:string):Promise<CommentRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            const data = {
                text: commentText
            }

            const fetchData:Comment = (await axios.post(`${URL_BFF}/comments/${id}`, data, config)).data
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
                headers: { Authorization: `${token}` },
            };

            await axios.delete(`${URL_BFF}/comments/${id}`, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async replyToComment(postId:string | undefined, followedComment:string | undefined, commentText:string):Promise<CommentRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            const data = {
                text: commentText,
                followedCommentID: followedComment
            }

            const fetchData:Comment = (await axios.post(`${URL_BFF}/comments/${postId}`, data, config)).data

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
                headers: { Authorization: `${token}` },
            };

            const data = {
                text: text
            }

            const fetchData:Comment = (await axios.patch(`${URL_BFF}/comments/${id}`, data, config)).data

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
                headers: { Authorization: `${token}` },
            };

            await axios.put(`${URL_BFF}/comments/like/${id}`, {}, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    }
}