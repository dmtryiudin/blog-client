import {auth} from "../utils/auth";
import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import {useEffect, useState} from "react";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        name: "",
        extra_details:"",
        skills: "",
        profession: "",
        details: ""
    })

    async function formSubmitHandler(e){
        e.preventDefault()
        auth.signUp(signUpData)
    }

    function setField(field, value){
        setSignUpData({...signUpData, [field]:value})
    }

    function clearForm(){
        setSignUpData({
            ...signUpData,
            email: "",
            password: "",
            name: "",
            extra_details:"",
            skills: "",
            profession: "",
            details: ""
        })
    }

    return (
        <div className="bg-neutral-100 rounded-xl w-1/2 p-2.5 border-2 border-neutral-200">
            <form className="p-3 w-4/5 space-y-8 flex flex-col" onSubmit={formSubmitHandler}>
                <InputWithCaption
                    caption="Email"
                    type="email"
                    changeHandler={(e)=>setField('email', e.target.value)}
                    inputValue={signUpData.email}
                />
                <InputWithCaption
                    caption="Password"
                    type="password"
                    changeHandler={(e)=>setField('password', e.target.value)}
                    inputValue={signUpData.password}
                />
                <InputWithCaption
                    caption="Name"
                    type="text"
                    changeHandler={(e)=>setField('name', e.target.value)}
                    inputValue={signUpData.name}
                />
                <InputWithCaption
                    caption="Extra details"
                    type="text"
                    changeHandler={(e)=>setField('extra_details', e.target.value)}
                    inputValue={signUpData.extra_details}
                />
                <InputWithCaption
                    caption="Skills"
                    type="text"
                    changeHandler={(e)=>setField('skills', e.target.value)}
                    inputValue={signUpData.skills}
                />
                <InputWithCaption
                    caption="Profession"
                    type="text"
                    changeHandler={(e)=>setField('profession', e.target.value)}
                    inputValue={signUpData.profession}
                />
                <InputWithCaption
                    caption="Details"
                    type="text"
                    changeHandler={(e)=>setField('details', e.target.value)}
                    inputValue={signUpData.details}
                />
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm