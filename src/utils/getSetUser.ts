import axios, {AxiosError} from "axios";
import {auth} from "./auth";
import {AuthHeader} from "../types/commonTypes";
import {User} from "../types/fetchSchemas";
import {UsersList} from "../types/getSetUser";

export const URL:string = 'http://test-blog-api.ficuslife.com/api/v1'
let token: string | null = localStorage.getItem('token')

if(token){
    token = JSON.parse(token)
}


export const getSetUser = {
    async deleteUser(id:string): Promise<void | AxiosError>{
        try{
            const config : AuthHeader = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.delete(`${URL}/users/${id}`, config);

            auth.logout()
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async updateAvatar(id:string, avatar:FileList):Promise<void | AxiosError>{

        try{
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let formData:FormData = new FormData()
            formData.append('avatar', avatar[0])

            await axios.put( `${URL}/users/upload/${id}`, formData, config)

        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async updateUserData(id:string, data:string):Promise<void | AxiosError>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` },
            };

            await axios.patch(`${URL}/users/${id}`, data, config)
        }

        catch (err:AxiosError|any){
            return err
        }
    },

    async getUserById(id:string):Promise<User | never>{
        try {
            const fetchData:User = (await axios.get(`${URL}/users/${id}`)).data
            return fetchData
        }
        catch (err){
            throw err
        }
    },

    async getAllUsers():Promise<UsersList | AxiosError>{
        try {
            return (await axios.get(`${URL}/users/?limit=999999999999999999999999999`)).data
        }
        catch (err : AxiosError | any){
            return err
        }
    }
}