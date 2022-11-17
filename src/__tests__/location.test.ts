import {location} from "../utils/location";
import axios from "axios";
import clearAllMocks = jest.clearAllMocks;

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('getIP function test from location module', ()=>{
    let response:any;

    beforeEach(()=>{
        response = {
            data: {
                ip: '123'
            }
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.get.mockReturnValue(response)
        const res = await location.getIP()
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(res).toEqual('123')
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('getLocation function test from location module', ()=>{
    let response:any;

    beforeEach(()=>{
        response = {
            data: {
                lat: 0,
                lon: 0
            }
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.get.mockReturnValue(response)
        const res = await location.getLocation('123')
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(res).toEqual({
            lat: 0,
            lon: 0
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})
