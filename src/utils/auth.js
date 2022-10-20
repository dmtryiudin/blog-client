import axios from "axios";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'

export const auth = {
    async login(authData){
        try {
            const response = await axios.post(`${URL}/auth`, authData)
            const token = response.data.token

            localStorage.removeItem('token')
            localStorage.setItem('token', JSON.stringify(token));

            const userData = await this.getDataByToken()

            if(!userData?.error){
                window.location = "/";
            }

        }
        catch (err){
            return {
                error:true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },

    async getDataByToken(){
        const token = localStorage.getItem('token')
        try{
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const userFetchData = await axios.get(`${URL}/auth/user`, config)
            return {
                error:false,
                data: userFetchData.data
            }
        }
        catch (err){
            localStorage.removeItem('token')
        }
    },

    async signUp(signUpData){
        try{
            const response = await axios.post(`${URL}/users`, signUpData)

            return {
                error:false,
                data: response.data
            }

        }
        catch (err){
            return {
                error:true,
                data: err.response.data.error[0].message || err.response.data.error
            }
        }
    },


}