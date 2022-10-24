import {useParams} from "react-router-dom";
import {posts} from "../utils/posts";
import {useEffect, useState} from "react";
import {getSetUser} from "../utils/getSetUser";

const Post = () => {
    const [postData, setPostData] = useState(null)
    const [authorData, setAuthorData] = useState(null)
    const id = useParams().id

    useEffect(()=>{
        posts.getPostById(id)
            .then((e)=>{
                setPostData(e)
                return e
            })
            .then((e)=>{
                getSetUser.getUserById(e?.postedBy)
                    .then(e=>{
                        setAuthorData(e)
                    })
            })
    }, [])

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

    return (
        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 my-14 flex">
            <img className="w-96 h-96" src={postData?.image ? 'http://test-blog-api.ficuslife.com' + postData.image : require('../img/noimage.png')}/>
            <div className="flex flex-col justify-between ml-8 w-2/3 break-words">
                {postData?.title && <span className="font-bold font-sans text-3xl break-words">{postData.title}</span>}
                {postData?.fullText && <span className="font-sans font-normal text-xl break-words">{postData.fullText}</span>}
                {postData?.description && <span className="font-sans font-normal text-xl break-words" >{postData.description}</span>}
                {
                    postData?.likes
                    &&
                    <div className="flex items-center">
                        <button className="w-10 h-10">
                            <img src={require('../img/unlike.png')} className="w-10 h-10" />
                        </button>
                        <span className="font-sans font-normal text-xl ml-2">
                            {postData.likes.length}
                        </span>
                    </div>
                }
                <div className="w-full flex justify-between">
                    <a href={'/profile/'+ authorData?._id} className="font-sans font-bold text-lg">By {authorData?.name}</a>
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
    )
}

export default Post
