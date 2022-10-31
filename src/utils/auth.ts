import axios, {AxiosError} from "axios";
import {AuthData, AuthRes,  SignUpData, UserFetchResponse} from '../types/authTypes'
import {User} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";

export const URL:string = 'http://test-blog-api.ficuslife.com/api/v1'


export const auth = {
    async login(authData:AuthData):Promise<AuthRes>{
        try {
            const response:UserFetchResponse = await axios.post(`${URL}/auth`, authData)
            const token:string = response.data.token

            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(token));


            const userData:AuthRes = await this.getDataByToken()
            console.log(userData)

            if(!userData?.error){
                window.location.href = "/";
            }

            return userData

        }
        catch (err:AxiosError | any){
            return {
                error:true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async getDataByToken():Promise<AuthRes>{
        let token:string | null = localStorage.getItem('token')
        try{
            if(token){
                token = JSON.parse(token)
            }
            const config:AuthHeader = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const userFetchData:User = (await axios.get(`${URL}/auth/user`, config)).data
            return {
                error:false,
                data: userFetchData
            }
        }
        catch (err : AxiosError | any){
            console.log('invalid token')
            localStorage.removeItem('token')

            return {
                error:true,
                data:err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async signUp(signUpData:SignUpData):Promise<AuthRes>{
        try{
            const response:User = (await axios.post(`${URL}/users`, signUpData)).data

            return {
                error:false,
                data: response
            }

        }
        catch (err:AxiosError | any){
            return {
                error:true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    logout():void{
        localStorage.removeItem('persist:store')
        localStorage.removeItem('token')
        window.location.reload();
    }

}