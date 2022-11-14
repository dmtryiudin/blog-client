import axios, {AxiosError} from "axios";
import {auth} from "./auth";
import {AuthHeader} from "../types/commonTypes";
import {User} from "../types/fetchSchemas";
import {UpdateUserData, UserWithPosts} from "../types/getSetUser";

if(process.env.NODE_ENV === 'test') {
    require('localstorage-polyfill');
}

const URL_BFF: string = 'http://localhost:3001'
let token: string | null = localStorage.getItem('token')

if(token){
    token = JSON.parse(token)
}


export const getSetUser = {
    async deleteUser(id:string): Promise<void>{
        try{
            const config : AuthHeader = {
                headers: { Authorization: `${token}` }
            };
            await axios.delete(`${URL_BFF}/users/${id}`, config);

            auth.logout()
        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async updateAvatar(id:string, avatar:FileList):Promise<void>{

        try{
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };
            let formData:FormData = new FormData()
            formData.append('avatar', avatar[0])

            await axios.patch( `${URL_BFF}/users/avatar/` + id, formData, config)

        }
        catch (err:AxiosError | any){
            return err
        }
    },

    async updateUserData(id:string, data:UpdateUserData):Promise<void>{
        try {
            const config:AuthHeader = {
                headers: { Authorization: `${token}` },
            };

            await axios.patch(`${URL_BFF}/users/${id}`, data, config)
        }

        catch (err:AxiosError|any){
            return err
        }
    },

    async getUserByIdWithPosts(id:string):Promise<UserWithPosts>{
        try {
            const fetchData:UserWithPosts = (await axios.get(`${URL_BFF}/users/${id}`)).data
            return fetchData
        }
        catch (err){
            throw err
        }
    },

    async getAllUsers(substr?: string):Promise<User[]>{
        try {
            if(substr?.trim()){
                return (await axios.get(`${URL_BFF}/users/?substr=${substr}`)).data
            }
            return (await axios.get(`${URL_BFF}/users/`)).data
        }
        catch (err : AxiosError | any){
            return err
        }
    }
}