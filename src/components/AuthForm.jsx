import {useEffect, useState} from "react";
import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import {auth} from "../utils/auth";

const AuthForm = () => {
    const [authData, setAuthData] = useState({
        email: "",
        password: ""
    })

    function setEmail(e){
        setAuthData({...authData, email: e.target.value})
    }

    function setPassword(e){
        setAuthData({...authData, password: e.target.value})
    }

    function clearForm(){
        setAuthData({
            ...authData,
            email: "",
            password: ""
        })
    }

    async function formSubmitHandler(e){
        e.preventDefault()

        await auth.login(authData)

    }

    return (
        <div className="bg-neutral-100 rounded-xl w-1/2 p-2.5 border-2 border-neutral-200">
            <form className="p-3 w-4/5 space-y-8 flex flex-col" onSubmit={formSubmitHandler}>
                <InputWithCaption caption="Email" changeHandler={setEmail} inputValue={authData.email} type="email"/>
                <InputWithCaption caption="Password" changeHandler={setPassword} inputValue={authData.password} type="password"/>
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
            </form>
        </div>
    )
}

export default AuthForm