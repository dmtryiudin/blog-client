import {auth} from "../utils/auth";
import React from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";

const ProfileMenu:React.FC = () => {
    const authData = useTypedSelector(state => state.auth)

    function logIn(){
        window.location.href = "/auth"
    }

    const menuButtons = [
        {
            title: authData.isAuth ? 'Logout' : "Login",
            func: authData.isAuth ? auth.logout : logIn
        },
        {
            title: 'My profile',
            func: ()=>{
                window.location.href="/profile/" + authData.fetchUserData!._id
            }
        },
        {
            title: 'Create post',
            func: ()=>{
                window.location.href="/create-post"
            }
        },
        {
            title: 'Edit profile',
            func: ()=>{
                window.location.href="/profile-settings"
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