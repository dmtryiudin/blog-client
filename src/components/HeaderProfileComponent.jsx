import ProfileMenu from "./ProfileMenu";
import {useSelector} from "react-redux";

const HeaderProfileComponent = () => {
    const auth = useSelector(state => state.auth)
    const imgSrc = auth.isAuth ?
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