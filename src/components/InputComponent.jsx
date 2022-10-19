const InputComponent = (props) => {
    return (
        <input
            onChange={props.changeHandler}
            value={props.inputValue}
            type={props.type}
            className="
                        focus:outline-none
                        rounded-xl
                        border-2
                        border-transparent
                        focus:border-black
                        p-2
                        w-full
                        font-sans
                        font-medium
                        text-lg"
        />
    )
}

export default InputComponent