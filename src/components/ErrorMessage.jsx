const ErrorMessage = (props) => {
    return (
        <div className="mt-3 font-sans font-semibold text-red-500 text-lg max-w-full">Error! {props.message}</div>
    )
}

export default ErrorMessage