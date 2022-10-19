import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import {Link, Navigate, redirect, Route, Routes} from "react-router-dom";
import {useEffect} from "react";

const Auth = () => {

    return (
        <div className="bg-neutral-100 rounded-3xl w-1/2 mx-auto border-gray-200 border-4 p-7">
            <nav className="flex w-full space-x-5 mb-8">
                <Link to="signin" className="font-bold underline font-sans font-normal text-lg text-neutral-600 hover:text-neutral-400">Sign In</Link>
                <Link to="signup" className="font-bold underline font-sans font-normal text-lg text-neutral-600 hover:text-neutral-400">Sign Up</Link>
            </nav>
            <Routes>
                <Route index path="/signin" element={<AuthForm/>} />
                <Route path="/signup" element={<SignUpForm/>} />
                <Route path="*" element={<Navigate to="signin" replace />} />
            </Routes>
        </div>
    )
}

export default Auth