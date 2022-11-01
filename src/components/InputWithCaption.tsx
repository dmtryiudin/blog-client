import InputComponent from "./InputComponent";
import React from "react";

interface InputWithCaptionProps{
    caption:string,
    changeHandler: (a:any)=>any,
    inputValue: string,
    type:string
}

const InputWithCaption:React.FC<InputWithCaptionProps> = (props) => {
    return (
        <div className="flex flex-col justify-between h-20 font-sans font-normal text-lg">
            <span>{props.caption}</span>
            <InputComponent {...props}/>
        </div>
    )
}

export default InputWithCaption