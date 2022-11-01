import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import React, {ChangeEvent, useEffect, useState} from "react";
import {comments} from "../utils/comments";
import ErrorMessage from "./ErrorMessage";
import {CommentRes} from "../types/commentsTypes";

interface EditCommentProps {
    setIsShow:(a:boolean)=>any,
    mode: string,
    commentText?:string,
    id:string | undefined,
    updateComments: ()=>any,
    followedId?:string,
    isShow: boolean,
}

const EditComment:React.FC<EditCommentProps> = (props) => {
    const [comment, setComment] = useState<string>('')
    const [error, setError] = useState<null | string>(null)

    function hideModal():void{
        props.setIsShow(false)
    }

    useEffect(()=>{
        if(props.mode === 'edit'){
            setComment(props.commentText!)
        }
        else {
            setComment('')
        }
    }, [props.mode])

    async function addComment():Promise<void>{
        if(props.mode === 'create'){
            const response:CommentRes = await comments.addComment(props.id, comment)
            if(response.error && (typeof response.data === "string")){
                setError(response.data)
            }
            else {
                props.updateComments()
                props.setIsShow(false)
            }
        }
        else if(props.mode === 'reply'){
            const response:CommentRes = await comments.replyToComment(props.id, props.followedId, comment)
            if(response.error && (typeof response.data === "string")){
                setError(response.data)
            }
            else {
                props.updateComments()
                props.setIsShow(false)
            }
        }
        else if(props.mode === 'edit'){
            console.log('edit')
            const response:CommentRes = await comments.editComment(props.followedId, comment)
            if (response.error && (typeof response.data === "string")){
                setError(response.data)
            }
            else {
                props.updateComments()
                props.setIsShow(false)
            }
        }
        else {
            console.log('wrong mode')
        }
    }

    return (props.isShow ?
            (<div className="inset-0 bg-black/75 fixed flex justify-center items-center">
                    <div className="w-1/2 h-1/2 rounded-xl bg-neutral-100 p-8 flex flex-col justify-between">
                        <InputWithCaption
                            caption="Your comment"
                            inputValue={comment}
                            changeHandler={(e:ChangeEvent<HTMLInputElement>)=>setComment(e.target.value)}
                            type="text"
                        />
                        <div>
                            <div className="w-44 flex justify-between">
                                <SubmitButton clickHandler={addComment}/>
                                <ResetButton clickHandler={hideModal}/>
                            </div>
                            {error && <ErrorMessage message={error}/>}
                        </div>
                    </div>
                </div>) : null)

}

export default EditComment
