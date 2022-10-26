import InputWithCaption from "./InputWithCaption";
import SubmitButton from "./SubmitButton";
import ResetButton from "./ResetButton";
import {useEffect, useState} from "react";
import {comments} from "../utils/comments";
import ErrorMessage from "./ErrorMessage";

const EditComment = (props) => {
    const [comment, setComment] = useState('')
    const [error, setError] = useState(null)

    function hideModal(){
        props.setIsShow(false)
    }

    useEffect(()=>{

        if(props.mode === 'edit'){
            setComment(props.commentText)
        }
        else {
            setComment('')
        }
    }, [props.mode])

    async function addComment(){
        if(props.mode === 'create'){
            const response = await comments.addComment(props.id, comment)
            if(response.error){
                setError(response.data)
            }
            else {
                props.updateComments()
                props.setIsShow(false)
            }
        }
        else if(props.mode === 'reply'){
            console.log('reply')
            const response = await comments.replyToComment(props.id, props.followedId, comment)
            if(response.error){
                setError(response.data)
            }
            else {
                props.updateComments()
                props.setIsShow(false)
            }
        }
        else if(props.mode === 'edit'){
            console.log('edit')
            const response = await comments.editComment(props.followedId, comment)
            if (response.error){
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

    return (props.isShow &&
            (<div className="inset-0 bg-black/75 fixed flex justify-center items-center">
                    <div className="w-1/2 h-1/2 rounded-xl bg-neutral-100 p-8 flex flex-col justify-between">
                        <InputWithCaption
                            caption="Your comment"
                            inputValue={comment}
                            changeHandler={e=>setComment(e.target.value)}
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
                </div>))

}

export default EditComment
