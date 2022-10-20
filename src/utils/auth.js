import axios from "axios";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'

export const auth = {
    async login(authData){
        try {
            const response = await axios.post(`${URL}/auth`, authData)

            const token = response.data.token

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const userFetchData = await axios.get(`${URL}/auth/user`, config)
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

    async signUp(signUpData){
        try{
            const response = await axios.post(`${URL}/users`, signUpData)

            if(response.data.error){
                return {
                    error:true,
                    data: response.data
                }
            }

            else{
                return {
                    error:false,
                    data: response.data
                }
            }
        }
        catch (err){
            console.log('Error', err)
        }
    }
}