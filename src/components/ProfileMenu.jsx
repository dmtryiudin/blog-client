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
        },
        {
            title: 'My profile',
            func: ()=>{
                window.location="/profile/" + authData.fetchUserData._id
            }
        },
        {
            title: 'Create post',
            func: ()=>{
                window.location="/create-post"
            }
        },
        {
            title: 'Edit profile',
            func: ()=>{
                window.location="/profile-settings"
            }
        }
    ]

    return (
        <div className="w-36 bg-white hidden group-hover:block absolute right-0">
            {menuButtons.map(e=>{
                return <div onClick={e.func} className="cursor-pointer z-50">{e.title}</div>
            })}
        </div>
    )
}

export default ProfileMenu