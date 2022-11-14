import axios, {AxiosError} from "axios";
import {UpdatePost, PostRes, PostsList, PostWithComments} from "../types/postsTypes";
import {Post} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";

if(process.env.NODE_ENV === 'test') {
    require('localstorage-polyfill');
}

const URL_BFF: string = 'http://localhost:3001'
let token: string | null = localStorage.getItem('token')

if(token){
    token = JSON.parse(token)
}

export const posts = {
    async getPostsWithPagination(skip:number, filter:string):Promise<PostsList>{
        try{
            if(filter){
                return (await axios.get(`${URL_BFF}/posts?skip=${skip}&search=${filter}`)).data
            }
            return (await axios.get(`${URL_BFF}/posts?skip=${skip}`)).data
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async getPostWithComments(id:string):Promise<PostWithComments>{
        try{
            return (await axios.get(`${URL_BFF}/posts/${id}`)).data
        }
        catch (err){
            throw err
        }
    },
    async updateImg(id:string | undefined, avatar:FileList):Promise<PostRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };
            let formData:FormData = new FormData()
            formData.append('image', avatar[0])

            const fetchData:Post = (await axios.patch(`${URL_BFF}/posts/image/${id}`, formData, config)).data
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

    async createPost(data:UpdatePost):Promise<PostRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            const fetchData:Post = (await axios.post(`${URL_BFF}/posts`, data, config)).data
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
    async updatePost(id:string | undefined, data:UpdatePost):Promise<PostRes>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            const fetchData:Post = (await axios.patch(`${URL_BFF}/posts/${id}`, data, config)).data
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

    async deletePost(id:string | undefined):Promise<void>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            await axios.delete(`${URL_BFF}/posts/${id}`, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async addLike(postId:string):Promise<void>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            await axios.put(`${URL_BFF}/posts/like/${postId}`, {}, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    }
}