import React from "react";

interface ResetButtonProps{
    clickHandler: (a:any)=>any
}

const ResetButton:React.FC<ResetButtonProps> = (props) => {
    return (
        <input type="reset"
               value="Cancel"
               className="bg-red-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
               onClick={props.clickHandler}
        />
    )
}

export default ResetButton
