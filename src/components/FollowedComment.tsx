import React, {useEffect, useState} from "react";
import {getSetUser} from "../utils/getSetUser";
import {Comment, User} from "../types/fetchSchemas";

interface FollowedCommentProps{
    comment: Comment
}

const FollowedComment:React.FC<FollowedCommentProps> = ({comment}) => {
    const {text, commentedBy} = comment
    const [authorData, setAuthorData] = useState<User | null>(null)

    useEffect(()=>{
        getSetUser.getUserByIdWithPosts(commentedBy)
            .then(e=>{
                setAuthorData(e)
            })
    }, [])

    return (
            <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-7 mb-6">
                <div className="flex items-center">
                    <img src={authorData?.avatar ? ('http://test-blog-api.ficuslife.com' + authorData?.avatar) : require('../img/unknown.jpg')} className="w-16 h-16 rounded-full hidden sm:block object-cover" />
                    <a href={'/profile/' + commentedBy}>
                        <span className="font-sans font-bold text-2xl ml-0 sm:ml-4">{authorData?.name}</span>
                    </a>
                </div>
                <div className="font-sans font-normal text-2xl mt-2 break-all">{text}</div>
            </div>
        )
}

export default FollowedComment