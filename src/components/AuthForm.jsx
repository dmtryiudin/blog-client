import {useEffect, useState} from "react";
import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import {auth} from "../utils/auth";
import {useDispatch} from "react-redux";

const AuthForm = (props) => {
    const [authData, setAuthData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

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

        const res = await auth.login(authData)
        clearForm()

        if(res?.error){
            props.setIsError(true)
            props.setErrorMessage(res.data)
        }

        else{
            dispatch({type:"LOGIN", payload:res.data})
        }
    }

    return (
        <div className="bg-neutral-100 rounded-3xl">
            <form className="xl:w-4/5 w-full space-y-8 flex flex-col" onSubmit={formSubmitHandler}>
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