import {auth} from "../utils/auth";
import axios from "axios";
import clearAllMocks = jest.clearAllMocks;

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('login function test from auth module', ()=>{
    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                token: 'aaa',
                userData: 'data'
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.post.mockReturnValue(normalResponse)

        const login = await auth.login({
            email: 'testmail@mail.com',
            password: '1234567'
        })

        expect(mockedAxios.post).toBeCalledTimes(1)
        expect(login).toEqual({
            error: false,
            data: 'data'
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('signUp function test from auth module', ()=>{

    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                token: 'aaa',
                userData: 'data'
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.post.mockReturnValue(normalResponse)

        const signUp = await auth.signUp({
            email: 'string',
            password: 'string',
            name: 'string',
            extra_details: 'string',
            skills: 'string',
            profession: 'string',
            details: 'string',
        })

        expect(mockedAxios.post).toBeCalledTimes(1)
        expect(signUp).toEqual({
            error: false,
            data: {
                token: "aaa",
                userData: "data",

            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('getDataByToken function test from auth module', ()=>{
    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                token: 'aaa',
                userData: 'data'
            }
        }
    })


    test('function works without errors', async ()=>{
        mockedAxios.get.mockReturnValue(normalResponse)
        const dataByToken = await auth.getDataByToken()

        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(dataByToken).toEqual({
            data: {
                token: 'aaa',
                userData: 'data'
            },
            error: false
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})
