import {useParams} from "react-router-dom";
import {posts} from "../utils/posts";
import React, {useEffect, useState} from "react";
import {getSetUser} from "../utils/getSetUser";
import CommentsList from "../components/CommentsList";
import Modal from "../components/Modal";
import EditComment from "../components/EditComment";
import {comments} from "../utils/comments";
import SubmitRemoval from "../components/SubmitRemoval";
import Loader from "../components/Loader";
import NotFound from "./NotFound";
import {Comment, Post, User} from '../types/fetchSchemas'
import {useTypedSelector} from "../hooks/useTypedSelector";
import {convertDate} from "../utils/commonFunctions";

const PostPage:React.FC = () => {
    const [postData, setPostData] = useState<Post | null>(null)
    const [authorData, setAuthorData] = useState<User | null>(null)
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [commentsList, setCommentsList] = useState<Comment[] | null>(null)
    const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false)
    const [errorData, setErrorData] = useState<boolean>(false)

    const id:string | undefined = useParams().id
    const state = useTypedSelector(state => state.auth)

    useEffect(()=>{
       updateData()
        updateComments()
    }, [])

    function updateData():void{
        if (id !== undefined){
            posts.getPostById(id)
                .then((e)=>{
                    setPostData(e)
                    if(e?.likes.indexOf(state.fetchUserData!._id) >= 0){
                        setIsLiked(true)
                    }
                    return e
                })
                .catch(error=>{
                    setErrorData(true)
                })
                .then((e)=>{
                    if(e?.postedBy){
                        getSetUser.getUserById(e?.postedBy)
                            .then(e=>{
                                setAuthorData(e)
                            })
                    }
                })
        }
    }

    function updateComments():void{
        if(id !== undefined){
            comments.getCommentsForPost(id)
                .then(e=>{
                    setCommentsList(e)
                })
        }
    }

    async function likeHandler():Promise<void>{
        if(id !== undefined){
            await posts.addLike(id)
            setIsLiked(false)
            updateData()
        }
    }

    async function deletePost():Promise<void>{
        await posts.deletePost(id)
        setShowRemoveDialog(false)
        window.location.href="/profile/" + state.fetchUserData!._id
    }

    return (
        (!errorData) ? (
                <>
                    {postData ?
                        <>
                            {
                                showModal && (
                                    <Modal>
                                        <EditComment isShow={showModal} setIsShow={setShowModal} updateComments={updateComments} id={id} mode="create"/>
                                    </Modal>
                                )
                            }
                            <Modal>
                                <SubmitRemoval
                                    isShow={showRemoveDialog}
                                    removeHandler={deletePost.bind(this)}
                                    hideModal={()=>setShowRemoveDialog(false)}
                                />
                            </Modal>
                            <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 my-14">
                                <div className="flex flex-col space-y-14">
                                    <img className="w-96 h-96" src={postData?.image ? 'http://test-blog-api.ficuslife.com' + postData.image : require('../img/noimage.png')} />
                                    <div className="flex flex-col justify-between break-words space-y-4">
                                        {postData?.title && <span className="font-bold font-sans text-3xl break-words">{postData.title}</span>}
                                        {postData?.fullText && <span className="font-sans font-normal text-xl break-words">{postData.fullText}</span>}
                                        {postData?.description && <span className="font-sans font-normal text-xl break-words" >{postData.description}</span>}
                                        {
                                            postData?.likes
                                            &&
                                            <div className="flex items-center">
                                                <button className="w-10 h-10" onClick={likeHandler} >
                                                    <img src={isLiked ? require('../img/like.png') : require('../img/unlike.png')} className="w-10 h-10" />
                                                </button>
                                                <span className="font-sans font-normal text-xl ml-2">
                                                {postData.likes.length}
                                            </span>
                                            </div>
                                        }
                                        <div className="w-full flex justify-between flex-col 2xl:flex-row space-y-4">
                                            {
                                                authorData?.name ?
                                                    <a href={'/profile/'+ authorData?._id} className="font-sans font-bold text-lg">By {authorData?.name}</a> :
                                                    <div />
                                            }
                                            {postData?.dateCreated && (
                                                <span>
                                            <span className="font-sans font-normal text-lg">Posted on </span>
                                            <span className="font-sans font-bold text-lg ml-1">{convertDate(postData.dateCreated)}</span>
                                        </span>
                                            )
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    state.fetchUserData!._id === authorData?._id ?
                                        (
                                            <div className="mt-5 w-44 flex justify-between">
                                                <button
                                                    className="bg-red-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
                                                    onClick={()=>setShowRemoveDialog(true)}
                                                >
                                                    Delete
                                                </button>
                                                <a href={`/update-post/${id}`}>
                                                    <button className="bg-orange-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer">
                                                        Edit
                                                    </button>
                                                </a>
                                            </div>
                                        ) :
                                        null
                                }
                                <button
                                    className="border-gray-200 border-4 mt-8 bg-white w-40 h-10 rounded-xl font-sans font-normal text-md text-white cursor-pointer text-black"
                                    onClick={()=>setShowModal(true)}
                                >
                                    Add comment
                                </button>
                                <CommentsList commentsList={commentsList} updateComments={updateComments} postId={id}/>
                            </div>
                        </> : <Loader />
                    }
                </>
            ) : <NotFound />
    )
}

export default PostPage
