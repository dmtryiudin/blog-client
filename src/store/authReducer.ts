import {AuthState, AuthAction, AuthActionTypes} from "../types/storeTypes";

const defaultState:AuthState = {
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
}

export const authReducer = (state = defaultState, action: AuthAction):AuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {...state, isAuth: true, fetchUserData: action.payload}
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
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
            }
        case AuthActionTypes.SET_USER_DATA:
            return {...state, fetchUserData: action.payload}
        default:
            return state
    }
}