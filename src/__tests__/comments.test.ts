import {comments} from "../utils/comments";
import axios from "axios";
import clearAllMocks = jest.clearAllMocks;

jest.mock('axios')
const mockedAxios = jest.mocked(axios)

describe('addComment function test from comments module', ()=>{
    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.post.mockReturnValue(normalResponse)

        const addComment = await comments.addComment('1', 'hi')
        expect(mockedAxios.post).toBeCalledTimes(1)
        expect(addComment).toEqual({
            error: false,
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })

})

describe('deleteComment function test from comments module', ()=>{
    test('function works without errors', async ()=>{
        await comments.deleteComment('1', )
        expect(mockedAxios.delete).toBeCalledTimes(1)
    })

})

describe('replyToComment function test from comments module', ()=>{

    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.post.mockReturnValue(normalResponse)
        const replyToComment = await comments.replyToComment('1','2', 'hi' )
        expect(mockedAxios.post).toBeCalledTimes(1)
        expect(replyToComment).toEqual({
            error: false,
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })

})

describe('editComment function test from comments module', ()=>{

    let normalResponse: any;

    beforeEach(()=>{
        normalResponse =  {
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        }
    })

    test('function works without errors', async ()=>{
        mockedAxios.patch.mockReturnValue(normalResponse)
        const editComment = await comments.editComment('1', 'hi' )
        expect(mockedAxios.patch).toBeCalledTimes(1)
        expect(editComment).toEqual({
            error: false,
            data: {
                _id: 'string',
                commentedBy: 'string',
                followedCommentID: 'string',
                postID:	'string',
                text: 'string',
                dateCreated: 'string',
                likes:[]
            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })

})

describe('setLike function test from comments module', ()=>{
    test('function works without errors', async ()=>{
        await comments.setLike('1', )
        expect(mockedAxios.put).toBeCalledTimes(1)
    })

})