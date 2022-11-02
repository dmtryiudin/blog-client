import axios from "axios";

export const getIP = async function():Promise<string>{
    return (await axios.get('https://api.ipify.org/?format=json')).data.ip
}

interface GetLocationParams{
    lat: number,
    lon: number
}

export const getLocation = async function(ip:string):Promise<GetLocationParams>{
    const URL = `http://ip-api.com/json/${ip}`

    const {lat, lon} = (await axios.get(URL)).data

    return {
        lat: +lat,
        lon: +lon,
    }
}