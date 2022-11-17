import {authReducer} from "../store/authReducer";
import {AuthActionTypes, FetchUserData} from "../types/storeTypes";
import clearAllMocks = jest.clearAllMocks;

describe('authReducer test', ()=>{
    let state: any;

    beforeEach(()=>{
        state = {
            isAuth: true,
            fetchUserData: {
                _id: "",
                email: "",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        }
    })
    test('login', ()=>{
        expect(authReducer(undefined, {
            type: AuthActionTypes.LOGIN,
            payload: {
                _id: "1",
                email: "qqq",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        })).toEqual({
            isAuth: true,
            fetchUserData: {
                _id: "1",
                email: "qqq",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        })
    })

    test('logout', ()=>{
        expect(authReducer(undefined, {
            type: AuthActionTypes.LOGOUT,
        })).toEqual({
            isAuth: false,
            fetchUserData: {
                _id: "",
                email: "",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })

    test('set user data', ()=>{
        expect(authReducer(state, {
            type: AuthActionTypes.SET_USER_DATA,
            payload: {
                _id: "1",
                email: "qqq",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        })).toEqual({
            isAuth: true,
            fetchUserData: {
                _id: "1",
                email: "qqq",
                name: "",
                avatar: "",
                extra_details: "",
                skills: "",
                profession: "",
                details: "",
                dateCreated: ""
            }
        })
    })

    afterEach(()=>{
        clearAllMocks()
    })
})