import axios from "axios";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'

export const posts = {
    async getPostsForUser(id){
        try{
            return (await axios.get(`${URL}/posts?postedBy=${id}`)).data
        }
        catch (err){
            return null
        }

    },
    async getPostsWithPagination(skip, filter){
        console.log(skip, filter)
        try{
            if(filter){
                return (await axios.get(`${URL}/posts?skip=${skip}&search=${filter}`)).data
            }
            return (await axios.get(`${URL}/posts?skip=${skip}`)).data
        }
        catch (err){
            return null
        }
    },

    async getPostById(id){
        try{
            return (await axios.get(`${URL}/posts/${id}`)).data
        }
        catch (err){
            return null
        }
    }
}