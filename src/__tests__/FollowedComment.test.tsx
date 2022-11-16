import {screen, render} from '@testing-library/react'
import FollowedComment from "../src/components/FollowedComment";
import {getSetUser} from "../src/utils/getSetUser";
import {Post} from "../src/types/fetchSchemas";
import {UserWithPosts} from "../src/types/getSetUser";

jest.mock('../src/utils/getSetUser')
const mockedGetSetUser = jest.mocked(getSetUser, {shallow: true})

const testComment = {
    likes:	[],
    _id: "612f99dbc46d5405b355d8de",
    text: "and this is my first comment",
    followedCommentID: "",
    dateCreated: "2021-09-01T15:18:51.859Z",
    commentedBy: "612dfff0c46d5405b35529d2",
    postID: "612cb4af902cf330b086a365",
}

describe('FollowedComment test', ()=>{

    let response: Promise<UserWithPosts>;

    beforeEach(()=>{
        const p:Promise<UserWithPosts> = new Promise((res, rej)=>{
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
        response = p
    })

    test('Normal usage', async ()=>{
        mockedGetSetUser.getUserByIdWithPosts.mockReturnValue(response)
        render(<FollowedComment comment={testComment} />)

        expect(mockedGetSetUser.getUserByIdWithPosts).toBeCalledTimes(1)
        expect(await screen.findByRole('img')).toBeInTheDocument()
        expect(await screen.findByText("and this is my first comment")).toBeInTheDocument()
        expect(await screen.findByText("John")).toBeInTheDocument()
    })
})
