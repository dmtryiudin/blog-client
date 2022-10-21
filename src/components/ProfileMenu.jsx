import {useDispatch, useSelector} from "react-redux";
import {auth} from "../utils/auth";

const ProfileMenu = (props) => {
    const dispatch = useDispatch()
    const authData = useSelector(state => state.auth)

    function logIn(){
        window.location = "/auth"
    }

    const menuButtons = [
        {
            title: authData.isAuth ? 'Logout' : "Login",
            func: authData.isAuth ? auth.logout : logIn
        }
    ]

    return (
        <div className="w-36 bg-white hidden group-hover:block absolute right-0">
            {menuButtons.map(e=>{
                return <div onClick={e.func}>{e.title}</div>
            })}
        </div>
    )
}

export default ProfileMenu