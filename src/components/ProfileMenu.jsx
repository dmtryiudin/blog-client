import {useSelector} from "react-redux";
import {auth} from "../utils/auth";

const ProfileMenu = (props) => {
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
        <div className="w-36
        hidden
        group-hover:block
        absolute
        right-0
        z-50
        bg-neutral-100
        rounded-lg
        border-neutral-200
        border-2">
            {menuButtons.map((e, index)=>{
                return (
                    <div
                    onClick={e.func}
                    className="
                        rounded-lg
                        cursor-pointer
                        p-4
                        box-border
                        text-center
                        bg-neutral-100
                        hover:bg-neutral-400
                        text-lg
                        "
                    key={index}
                    >
                        {e.title}
                     </div>
                )
            })}
        </div>
    )
}

export default ProfileMenu