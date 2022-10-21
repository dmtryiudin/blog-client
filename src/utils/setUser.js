import axios from "axios";
import {auth} from "./auth";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'


export const setUser = {
    async deleteUser(id){
        try{
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`${URL}/users/${id}`, config);

            auth.logout()
        }
        catch (err){
            return null
        }
    },

    async updateAvatar(id, avatar){
        try{
            const token = JSON.parse(localStorage.getItem('token'))
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let formData = new FormData()
            formData.append('avatar', avatar[0])

            await axios.put( `${URL}/users/upload/${id}`, formData, config)

        }
        catch (err){
            return null
        }
    },

    async updateUserData(id, data){
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        await axios.patch(`${URL}/users/${id}`, data, config)
    }
}