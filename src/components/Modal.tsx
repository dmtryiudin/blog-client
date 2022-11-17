import {createPortal} from "react-dom";
import React, {useState} from "react";

interface ModalProps{
    children: React.ReactNode | React.ReactChild
}

const Modal:React.FC<ModalProps> = (props) => {
    const modalRoot = document.getElementById('modal')!;
    const [divElement, _] = useState(document.createElement('div'))

    useState(()=>{
        modalRoot.appendChild(divElement)

        return ()=>{
            modalRoot.removeChild(divElement)
        }
    })

    return createPortal(
        props.children,
        divElement
    );
}

export default Modal
