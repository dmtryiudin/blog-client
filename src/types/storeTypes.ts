export enum AuthActionTypes{
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    SET_USER_DATA = 'SET_USER_DATA'
}

export interface AuthState {
    isAuth: boolean,
    fetchUserData?: {
        _id: string,
        email: string,
        name: string,
        avatar: string,
        extra_details: string,
        skills: string,
        profession: string,
        details: string,
        dateCreated: string
    }
}

export interface FetchUserData{
    _id: string,
    email: string,
    name: string,
    avatar: string,
    extra_details: string,
    skills: string,
    profession: string,
    details: string,
    dateCreated: string
}

export interface LoginAction{
    type: AuthActionTypes.LOGIN,
    payload: FetchUserData
}

export interface LogoutAction{
    type: AuthActionTypes.LOGOUT
}

export interface SetUserDataAction{
    type: AuthActionTypes.SET_USER_DATA,
    payload: FetchUserData
}

export type AuthAction = LoginAction | LogoutAction | SetUserDataAction