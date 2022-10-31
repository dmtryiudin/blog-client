import axios, {AxiosError} from "axios";
import {UpdatePost, PostRes, PostsList} from "../types/postsTypes";
import {Post} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";

export const URL:string = 'http://test-blog-api.ficuslife.com/api/v1'
let token: string | null = localStorage.getItem('token')

if(token){
    token = JSON.parse(token)
}

export const posts = {
    async getPostsForUser(id:string):Promise<PostsList | never>{
        try{
            return (await axios.get(`${URL}/posts?postedBy=${id}`)).data
        }
        catch (err: AxiosError | any){
            throw err
        }

    },
    async getPostsWithPagination(skip:number, filter:string):Promise<PostsList | AxiosError>{
        try{
            if(filter){
                return (await axios.get(`${URL}/posts?skip=${skip}&search=${filter}`)).data
            }
            return (await axios.get(`${URL}/posts?skip=${skip}`)).data
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async getPostById(id:string):Promise<Post | never>{
        try{
            return (await axios.get(`${URL}/posts/${id}`)).data
        }
        catch (err){
            throw err
        }
    },
    async updateImg(id:string, avatar:Array<Blob>):Promise<PostRes>{
        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let formData:FormData = new FormData()
            formData.append('image', avatar[0])

            const fetchData:Post = (await axios.put(`${URL}/posts/upload/${id}`, formData, config)).data
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
                headers: { Authorization: `Bearer ${token}` },
            };

            const fetchData:Post = (await axios.post(`${URL}/posts`, data, config)).data
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
    async updatePost(id:string, data:UpdatePost):Promise<PostRes>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const fetchData:Post = (await axios.patch(`${URL}/posts/${id}`, data, config)).data
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

    async deletePost(id:string):Promise<void | AxiosError>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.delete(`${URL}/posts/${id}`, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async addLike(postId:string):Promise<void | AxiosError>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.put(`${URL}/posts/like/${postId}`, {}, config)
        }
        catch (err:AxiosError | any){
            return err
        }
    }
}