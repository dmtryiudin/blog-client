import {createPortal} from "react-dom";
import {useState} from "react";

const Modal = (props) => {
    const modalRoot = document.getElementById('modal');
    const [divElement, _] = useState(document.createElement('div'))

    useState(()=>{
        modalRoot.appendChild(divElement)

        return ()=>{
            modalRoot.removeChild(divElement)
        }
    }, [])

    return createPortal(
        props.children,
        divElement
    );
}

export default Modal