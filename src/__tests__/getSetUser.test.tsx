import {getSetUser} from "../utils/getSetUser";
import axios from "axios";
import clearAllMocks = jest.clearAllMocks;

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('deleteUser function from getSetUser module test', ()=>{
    beforeAll(()=>{
        clearAllMocks()
    })

    test('function works without errors', async ()=>{
        await getSetUser.deleteUser('1')
        expect(mockedAxios.delete).toBeCalledTimes(1)
    })
})

describe('updateAvatar function from getSetUser module test', ()=>{
    beforeAll(()=>{
        clearAllMocks()
    })

    test('function works without errors', async ()=>{
        await getSetUser.updateAvatar('1', {})
        expect(mockedAxios.patch).toBeCalledTimes(1)
    })
})

describe('updateUserData function from getSetUser module test', ()=>{
    beforeAll(()=>{
        clearAllMocks()
    })

    test('function works without errors', async ()=>{
        await getSetUser.updateUserData('1', {
            name: 'hi',
            extra_details: 'w',
            skills: '',
            profession: '',
            details: ''
        })
        expect(mockedAxios.patch).toBeCalledTimes(1)
    })
})

describe('getUserByIdWithPosts function from getSetUser module test', ()=>{
    let response: any;

    beforeAll(()=>{
        clearAllMocks()

        response = {
            data: {
                _id: 'string',
                email: 'string',
                name: 'string',
                avatar:	'string',
                extra_details: 'string',
                skills:	'string',
                profession:	'string',
                details: 'string',
                dateCreated: 'string',
                posts: []
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.get.mockReturnValue(response)

        const user = await getSetUser.getUserByIdWithPosts('1')
        expect(user).toEqual({
            _id: 'string',
            email: 'string',
            name: 'string',
            avatar:	'string',
            extra_details: 'string',
            skills:	'string',
            profession:	'string',
            details: 'string',
            dateCreated: 'string',
            posts: []
        })
        expect(mockedAxios.get).toBeCalledTimes(1)
    })
})

describe('getAllUsers function from getSetUser module test', ()=>{
    let response: any;

    beforeAll(()=>{
        clearAllMocks()

        response = {
            data: []
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.get.mockReturnValue(response)

        const user = await getSetUser.getAllUsers('1')
        expect(user).toEqual([])
        expect(mockedAxios.get).toBeCalledTimes(1)
    })
})