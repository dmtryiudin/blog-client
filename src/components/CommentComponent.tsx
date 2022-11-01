import {getSetUser} from "../utils/getSetUser";
import React, {useEffect, useState} from "react";
import FollowedComment from "./FollowedComment";
import {comments} from "../utils/comments";
import Modal from "./Modal";
import EditComment from "./EditComment";
import SubmitRemoval from "./SubmitRemoval";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Comment, User} from "../types/fetchSchemas";
import {convertDate} from "../utils/commonFunctions";

interface CommentComponentProps{
    commentedBy:string,
    likes:Array<string>,
    id: string | undefined,
    updateComments: ()=>any,
    postId: string | undefined,
    text: string,
    followedComment?: Comment,
    date: string | Date
}

const CommentComponent:React.FC<CommentComponentProps> = (props) => {
    const [commentedBy, setCommentedBy] = useState<User | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [mode, setMode] = useState<string>('')
    const [isLike, setIsLike] = useState<boolean>(false)
    const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false)

    const authData = useTypedSelector(state => state.auth)

    useEffect(()=>{
        getSetUser.getUserById(props.commentedBy)
            .then(e=>{
                setCommentedBy(e)
            })
    }, [])

    useEffect(()=>{
        props.likes?.indexOf(authData.fetchUserData!._id) >=0 ? setIsLike(true) : setIsLike(false)
    })

    async function deleteComment():Promise<void>{
        await comments.deleteComment(props.id)
        props.updateComments()
        setShowRemoveDialog(false)
    }

    function replyComment():void{
        setMode('reply')
        setShowModal(true)
    }

    function editComment():void{
        setMode('edit')
        setShowModal(true)
    }

    async function addLike():Promise<void>{
        await comments.setLike(props.id)
        props.updateComments()
    }

    return (
        <>
            <Modal>
                <EditComment
                    isShow={showModal}
                    setIsShow={setShowModal}
                    mode={mode}
                    updateComments={props.updateComments}
                    id={props.postId}
                    followedId={props.id}
                    commentText={props.text}
                />
            </Modal>
            <Modal>
                <SubmitRemoval
                    isShow={showRemoveDialog}
                    removeHandler={deleteComment.bind(this)}
                    hideModal={()=>setShowRemoveDialog(false)}
                />
            </Modal>
            <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 my-6">
                {
                    props.followedComment ? <FollowedComment comment={props.followedComment}/> : null
                }
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img src={commentedBy?.avatar ? ('http://test-blog-api.ficuslife.com' + commentedBy.avatar) : require('../img/unknown.jpg')} className="w-16 h-16 rounded-full hidden sm:block"/>
                        <a href={'/profile/' + commentedBy?._id}>
                            <h3 className="font-sans font-bold text-2xl ml-0 sm:ml-4">{commentedBy?.name}</h3>
                        </a>
                    </div>
                    <span className="font-sans font-normal text-lg ml-4 hidden sm:block">{convertDate(props.date)}</span>
                </div>
                <div className="mt-4 font-sans font-normal text-2xl break-all">{props.text}</div>
                <div className="flex items-center mt-6">
                    <button className="w-6 h-6" onClick={addLike}>
                        <img src={isLike ? require('../img/like.png') : require('../img/unlike.png')} className="w-6 h-6" />
                    </button>
                    <div className="font-sans font-normal text-xl ml-2">
                        {props.likes?.length || 0}
                    </div>
                </div>
                <div className="flex w-24 justify-between mt-6">{
                    commentedBy?._id === authData.fetchUserData!._id ? (
                        <>
                            <button
                                style={{background: `url(${require('../img/edit.png')})`, backgroundSize: '100%'}}
                                className="w-6 h-6"
                                onClick={editComment}
                            ></button>
                            <button
                                style={{background: `url(${require('../img/delete.png')})`, backgroundSize: '100%'}}
                                className="w-6 h-6"
                                onClick={()=>setShowRemoveDialog(true)}
                            ></button>
                        </>
                    ) : null
                }
                    <button style={{background: `url(${require('../img/reply.png')})`, backgroundSize: '100%'}} className="w-6 h-6" onClick={replyComment}></button>
                </div>
            </div>
        </>
    )
}

export default CommentComponent