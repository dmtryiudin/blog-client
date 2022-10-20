const defaultState = {
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

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isAuth: true, fetchUserData: action.payload}
        case 'LOGOUT':
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
        case 'SET_USER_DATA':
            return {...state, fetchUserData: action.payload}
        default:
            return state
    }
}