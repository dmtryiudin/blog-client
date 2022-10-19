import InputComponent from "./InputComponent";

const InputWithCaption = (props) => {
    return (
        <div className="flex flex-col justify-between h-20 font-sans font-normal text-lg">
            <span>{props.caption}</span>
            <InputComponent {...props}/>
        </div>
    )
}

export default InputWithCaption