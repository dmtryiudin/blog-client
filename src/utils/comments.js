import axios from "axios";
export const URL = 'http://test-blog-api.ficuslife.com/api/v1'
const token = JSON.parse(localStorage.getItem('token'))

export const comments = {
    async getCommentsForPost(id){
        try{
            return (await axios.get(`${URL}/comments/post/${id}`)).data
        }
        catch (err){
            return null
        }
    },

    async addComment(id, commentText){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: commentText
            }

            const fetchData = await axios.post(`${URL}/comments/post/${id}`, data, config)
            return {
                error: false,
                data: fetchData.data
            }
        }
        catch(err){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async deleteComment(id){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            return await axios.delete(`${URL}/comments/${id}`, config)
        }
        catch (err){
            return null
        }
    },

    async replyToComment(postId, followedComment, commentText){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: commentText,
                followedCommentID: followedComment
            }

            const fetchData = await axios.post(`${URL}/comments/post/${postId}`, data, config)

            return {
                error: false,
                data: fetchData.data
            }
        }
        catch(err){
            return {
                error: true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async editComment(id, text){
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const data = {
                text: text
            }

            const fetchData = await axios.patch(`${URL}/comments/${id}`, data, config)

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

    async setLike(id){
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.put(`${URL}/comments/like/${id}`, {}, config)
        }
        catch (err){
            return null
        }
    }
}