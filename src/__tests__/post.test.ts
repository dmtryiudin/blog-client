import {posts} from "../utils/posts";
import axios from "axios";
import clearAllMocks = jest.clearAllMocks;

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('getPostsWithPagination function test from posts module', ()=>{
    let response: any;

    beforeEach(()=>{
        response = {
            data: {
                pagination: {
                    limit: 'string',
                    skip: 'string',
                    total: 'string'
                },

                data: []
            }
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.get.mockReturnValue(response)
        const data = await posts.getPostsWithPagination(10, '')
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(data).toEqual({
            pagination: {
                limit: 'string',
                skip: 'string',
                total: 'string'
            },

            data: []
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('getPostWithComments function test from posts module', ()=>{
    let response: any;

    beforeEach(()=>{
        response = {
            data: {
                _id: 'string',
                title: 'string',
                fullText: 'string',
                description: 'string',
                dateCreated: 'string',
                image: 'string',
                likes: [],
                postedBy: 'string',
                comments: []
            }
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.get.mockReturnValue(response)
        const data = await posts.getPostWithComments('1')
        expect(mockedAxios.get).toBeCalledTimes(1)
        expect(data).toEqual({
            _id: 'string',
            title: 'string',
            fullText: 'string',
            description: 'string',
            dateCreated: 'string',
            image: 'string',
            likes: [],
            postedBy: 'string',
            comments: []
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('updateImg function test from posts module', ()=>{
    let response: any;

    beforeEach(()=>{
        response = {
            error: false,
            data: {}
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.patch.mockReturnValue(response)
        const data = await posts.updateImg('1', {})
        expect(mockedAxios.patch).toBeCalledTimes(1)
        expect(data).toEqual({
            error: false,
            data: {}
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('createPost function test from posts module', ()=>{
    let response: any;

    beforeEach(()=>{
        response = {
            error: false,
            data: {}
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.post.mockReturnValue(response)
        const data = await posts.createPost({
            title: 'string',
            fullText: 'string',
            description: 'string',
        })
        expect(mockedAxios.post).toBeCalledTimes(1)
        expect(data).toEqual({
            error: false,
            data: {}
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('updatePost function test from posts module', ()=>{
    let response: any;

    beforeEach(()=>{
        response = {
            error: false,
            data: {}
        }
    })
    test('function works with no error', async ()=>{
        mockedAxios.patch.mockReturnValue(response)
        const data = await posts.updatePost('1', {
            title: 'string',
            fullText: 'string',
            description: 'string',
        })
        expect(mockedAxios.patch).toBeCalledTimes(1)
        expect(data).toEqual({
            error: false,
            data: {}
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('deletePost function test from posts module', ()=>{
    test('function works with no error', async ()=>{
        await posts.deletePost('1')
        expect(mockedAxios.delete).toBeCalledTimes(1)
    })

    afterEach(()=>{
        clearAllMocks()
    })
})

describe('addLike function test from posts module', ()=>{
    test('function works with no error', async ()=>{
        await posts.addLike('1')
        expect(mockedAxios.put).toBeCalledTimes(1)
    })

    afterEach(()=>{
        clearAllMocks()
    })
})