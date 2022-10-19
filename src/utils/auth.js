import axios from "axios";

export const URL = 'http://test-blog-api.ficuslife.com/api/v1'

export const auth = {
    async login(authData){
        try {
            const response = await axios.post(`${URL}/auth`, authData)

            if(response.data.error){
                console.log(response.data)
            }

            else{
                const token = response.data.token

                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const userFetchData = await axios.get(`${URL}/auth/user`, config)
                console.log(userFetchData.data)
            }
        }
        catch (err){
            console.log('Error: ', JSON.stringify(err))
        }
    },

    async signUp(signUpData){
        try{
            const response = await axios.post(`${URL}/users`, signUpData)

            if(response.data.error){
                console.log(response.data.error)
            }

            else{
                console.log(response.data)
            }
        }
        catch (err){
            console.log('Error', err)
        }
    }
}