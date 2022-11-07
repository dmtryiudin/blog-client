import axios, {AxiosError} from "axios";
import {AuthResult, AuthData, AuthResponse, SignUpData} from '../types/authTypes'
import {User} from "../types/fetchSchemas";
import {AuthHeader} from "../types/commonTypes";

const URL:string = 'http://localhost:3001'

export const auth = {
    async login(authData:AuthData):Promise<AuthResult>{
        try {
            const request:AuthResponse = (await axios.post(URL+ '/auth', authData)).data
            const token:string = request.token

            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(token));

            window.location.href = '/'

            return {
                data: request.userData,
                error: false
            }
        }
        catch (err: any){
            localStorage.removeItem('token')
            return {
                error:true,
                data:err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async getDataByToken():Promise<AuthResult>{
        let token:string | null = localStorage.getItem('token')
        try{
            if(token){
                token = JSON.parse(token)
            }

            const config:AuthHeader = {
                headers: { Authorization: `${token}` }
            };

            const userFetchData:User = (await axios.get(URL + `/auth`, config)).data
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

    async signUp(signUpData:SignUpData):Promise<AuthResult>{
        try{
            const response:User = (await axios.post(URL + `/users`, signUpData)).data

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