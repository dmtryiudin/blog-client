import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {useState} from "react";

const Auth = () => {
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')



    return (
        <div className="bg-neutral-100 rounded-3xl w-1/2 mx-auto border-gray-200 border-4 p-7 my-14">
            <nav className="flex w-full space-x-5 mb-8">
                <Link to="signin" className="font-bold underline font-sans font-normal text-lg text-neutral-600 hover:text-neutral-400">Sign In</Link>
                <Link to="signup" className="font-bold underline font-sans font-normal text-lg text-neutral-600 hover:text-neutral-400">Sign Up</Link>
            </nav>
            <Routes>
                <Route index path="/signin" element={<AuthForm setIsError={setIsError} setErrorMessage={setErrorMessage}/>} />
                <Route path="/signup" element={<SignUpForm setIsError={setIsError} setErrorMessage={setErrorMessage}/>} />
                <Route path="*" element={<Navigate to="signin" replace />} />
            </Routes>
            {isError && <ErrorMessage message={errorMessage}/>}
        </div>
    )
}

export default Auth