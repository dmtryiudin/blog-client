const SubmitRemoval = (props) => {
    return (props.isShow &&
                (
                    <div className="inset-0 bg-black/75 fixed flex justify-center items-center">
                        <div className="w-96 h-56 rounded-xl bg-neutral-100 p-8 flex flex-col items-center justify-between">
                            <span className="font-sans font-normal text-xl">Are you sure?</span>
                            <div className="flex justify-between items-center">
                                <button
                                    className="bg-red-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
                                    onClick={props.hideModal}
                                >
                                    No
                                </button>
                                <button
                                    className="ml-8 bg-green-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
                                    onClick={props.removeHandler}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )
    )
}

export default SubmitRemoval