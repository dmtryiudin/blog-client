import axios from "axios";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'
const token = JSON.parse(localStorage.getItem('token'))

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
    },
    async updateImg(id, avatar){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let formData = new FormData()
            formData.append('image', avatar[0])

            const fetchData = await axios.put(`${URL}/posts/upload/${id}`, formData, config)
            return {
                error: false,
                data: fetchData.data
            }

        }
        catch (err){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async createPost(data){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const fetchData = await axios.post(`${URL}/posts`, data, config)
            return {
                error: false,
                data: fetchData.data
            }
        }
        catch (err){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }

    }
}