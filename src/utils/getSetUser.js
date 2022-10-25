import axios from "axios";
import {auth} from "./auth";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'
const token = JSON.parse(localStorage.getItem('token'))


export const getSetUser = {
    async deleteUser(id){
        try{
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
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        await axios.patch(`${URL}/users/${id}`, data, config)
    },

    async getUserById(id){
        try {
            return (await axios.get(`${URL}/users/${id}`)).data
        }
        catch (err){
            return null
        }
    },

    async getAllUsers(){
        try {
            return (await axios.get(`${URL}/users/?limit=999999999999999999999999999`)).data
        }
        catch (err){
            return null
        }
    }
}