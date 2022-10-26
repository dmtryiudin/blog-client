import {useParams} from "react-router-dom";
import {posts} from "../utils/posts";
import {useEffect, useState} from "react";
import {getSetUser} from "../utils/getSetUser";
import {useSelector} from "react-redux";
import CommentsList from "../components/CommentsList";
import Modal from "../components/Modal";
import EditComment from "../components/EditComment";
import {comments} from "../utils/comments";

const Post = () => {
    const [postData, setPostData] = useState(null)
    const [authorData, setAuthorData] = useState(null)
    const [isLiked, setIsLiked] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const id = useParams().id
    const state = useSelector(state => state)

    const [commentsList, setCommentsList] = useState(null)

    useEffect(()=>{
       updateData()
        updateComments()
    }, [])

    function updateData(){
        posts.getPostById(id)
            .then((e)=>{
                setPostData(e)
                if(e.likes.indexOf(state.auth.fetchUserData._id) >= 0){
                    setIsLiked(true)
                }
                return e
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

    function updateComments(){
        comments.getCommentsForPost(id)
            .then(e=>{
                setCommentsList(e)
            })
    }

    async function likeHandler(){
        await posts.addLike(id)
        setIsLiked(false)
        updateData()
    }

    function convertDate(date){
        function addZero(val){
            return val.toString().length === 1 ? "0"+val : val
        }
        const newDate = new Date(date)
        return addZero(newDate.getDate()) + "."
            + addZero((Number(newDate.getMonth()) + 1)) + "."
            + newDate.getFullYear() + " "
            + addZero(newDate.getHours()) + ":"
            + addZero(newDate.getMinutes())
    }

    async function deletePost(){
        await posts.deletePost(id)
    }

    return (

            <>
                {postData &&
                    <>
                        {
                            showModal && (
                                <Modal>
                                    <EditComment isShow={showModal} setIsShow={setShowModal} updateComments={updateComments} id={id} mode="create"/>
                                </Modal>
                            )
                        }
                        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 my-14">
                            <div className="flex">
                                <img className="w-96 h-96" src={postData?.image ? 'http://test-blog-api.ficuslife.com' + postData.image : require('../img/noimage.png')} />
                                <div className="flex flex-col justify-between ml-8 w-2/3 break-words">
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
                                    <div className="w-full flex justify-between">
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
                                state.auth.fetchUserData._id === authorData?._id ?
                                    (
                                        <div className="mt-5 w-44 flex justify-between">
                                            <button
                                                className="bg-red-500 w-20 h-10 rounded font-sans font-normal text-md text-white cursor-pointer"
                                                onClick={deletePost}
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
                    </>
                }
            </>
    )
}

export default Post
