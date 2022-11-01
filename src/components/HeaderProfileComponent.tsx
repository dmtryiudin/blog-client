import ProfileMenu from "./ProfileMenu";
import React from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";

const HeaderProfileComponent:React.FC = () => {
    const auth = useTypedSelector(state => state.auth)
    const imgSrc = (auth.isAuth && auth.fetchUserData) ?
        ((auth.fetchUserData.avatar ? 'http://test-blog-api.ficuslife.com' + auth.fetchUserData.avatar : auth.fetchUserData.avatar) || require('../img/unknown.jpg')) :
        require('../img/login.png')
    return (
        <div className="group relative w-36">
            <img src={imgSrc} className="w-16 h-16 ml-20 rounded-full" />
            <ProfileMenu />
        </div>
    )
}

export default HeaderProfileComponent