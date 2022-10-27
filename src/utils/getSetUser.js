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
            return err
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
            return err
        }
    },

    async updateUserData(id, data){
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.patch(`${URL}/users/${id}`, data, config)
        }

        catch (err){
            return err
        }
    },

    async getUserById(id){
        try {
            const fetchData = (await axios.get(`${URL}/users/${id}`)).data
            return fetchData
        }
        catch (err){
            throw err
        }
    },

    async getAllUsers(){
        try {
            return (await axios.get(`${URL}/users/?limit=999999999999999999999999999`)).data
        }
        catch (err){
            return err
        }
    }
}