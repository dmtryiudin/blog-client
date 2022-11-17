import {screen, render} from '@testing-library/react'
import FollowedComment from "../components/FollowedComment";
import {getSetUser} from "../utils/getSetUser";
import {UserWithPosts} from "../types/getSetUser";
import clearAllMocks = jest.clearAllMocks;
import React from 'react'

jest.mock('../utils/getSetUser')
const mockedGetSetUser = jest.mocked(getSetUser)

const testComment = {
    likes:	[],
    _id: "612f99dbc46d5405b355d8de",
    text: "and this is my first comment",
    followedCommentID: "",
    dateCreated: "2021-09-01T15:18:51.859Z",
    commentedBy: "612dfff0c46d5405b35529d2",
    postID: "612cb4af902cf330b086a365",
}

const commentWithoutUser = {
    likes:	[],
    _id: "612f99dbc46d5405b355d8de",
    text: "and this is my first comment",
    followedCommentID: "",
    dateCreated: "2021-09-01T15:18:51.859Z",
    commentedBy: "",
    postID: "612cb4af902cf330b086a365",
}

describe('FollowedComment component test', ()=>{

    let normalUser: Promise<UserWithPosts>;
    let deletedUser: Promise<UserWithPosts>

    beforeEach(()=>{
        const p1:Promise<UserWithPosts> = new Promise((res, rej)=>{
            res({
                _id: "1",
                email: "mail@test.com",
                name: "John",
                avatar:	"",
                extra_details: "",
                skills:	"",
                profession:	"",
                details: "",
                dateCreated: "",
                posts: []
            })
        })

        const p2:Promise<UserWithPosts> = new Promise((res, rej)=>{
            res({
                _id: "",
                email: "",
                name: "",
                avatar:	"",
                extra_details: "",
                skills:	"",
                profession:	"",
                details: "",
                dateCreated: "",
                posts: []
            })
        })

        normalUser = p1
        deletedUser = p2
    })

    test('Component works with no error', async ()=>{
        mockedGetSetUser.getUserByIdWithPosts.mockReturnValue(normalUser)
        render(<FollowedComment comment={testComment} />)

        expect(mockedGetSetUser.getUserByIdWithPosts).toBeCalledTimes(1)
        expect(await screen.findByRole('img')).toBeInTheDocument()
        expect(await screen.findByText("and this is my first comment")).toBeInTheDocument()
        expect(await screen.findByText("John")).toBeInTheDocument()
    })

    test('Component works with deleted user', async ()=>{
        mockedGetSetUser.getUserByIdWithPosts.mockReturnValue(deletedUser)
        render(<FollowedComment comment={commentWithoutUser} />)

        expect(mockedGetSetUser.getUserByIdWithPosts).toBeCalledTimes(1)
        expect(await screen.findByRole('img')).toBeInTheDocument()
        expect(await screen.findByText("and this is my first comment")).toBeInTheDocument()
    })

    afterEach(()=>{
        clearAllMocks()
    })
})
