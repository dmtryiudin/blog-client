import {useEffect, useState} from "react";
import {getSetUser} from "../utils/getSetUser";

const FollowedComment = ({post}) => {
    const {text, commentedBy} = post
    const [authorData, setAuthorData] = useState(null)

    useEffect(()=>{
        getSetUser.getUserById(commentedBy)
            .then(e=>{
                setAuthorData(e)
            })
    }, [])

    return (
        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 my-6">
            <div className="flex items-center">
                <img src={authorData?.avatar ? ('http://test-blog-api.ficuslife.com' + authorData.avatar) : require('../img/unknown.jpg')} className="w-16 h-16 rounded-full" />
                <a href={'/profile/' + commentedBy}>
                    <span className="font-sans font-bold text-2xl ml-4">{authorData?.name}</span>
                </a>
            </div>
            <div className="font-sans font-normal text-2xl mt-2">{text}</div>
        </div>
    )
}

export default FollowedComment