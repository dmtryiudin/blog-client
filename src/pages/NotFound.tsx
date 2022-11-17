import React from "react";

const NotFound:React.FC = () => {
    return (
        <div className="text-center
        absolute
        top-2/4
        left-2/4
        leading-loose
        text-3xl
        font-semibold
        uppercase
        "
             data-testid="not-found"
             style={{transform: 'translate(-50%, -50%)'}}>
            404<br/>¯\_(^ ^)_/¯<br/>Not found
        </div>
    )
}

export default NotFound