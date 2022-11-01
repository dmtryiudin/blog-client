import CommentComponent from "./CommentComponent";
import React from "react";
import {Comment} from "../types/fetchSchemas";

interface CommentsListProps{
    commentsList: Comment[] | null,
    updateComments: ()=>void,
    postId: string | undefined,
}

const CommentsList:React.FC<CommentsListProps> = (props) => {

    return (
        <div>
            {props.commentsList && props.commentsList.map(e=>{
                if(e.followedCommentID){
                    const followedComment = props.commentsList!.filter(el=>el._id === e.followedCommentID)[0]
                    return <CommentComponent
                        text={e.text}
                        date={e.dateCreated}
                        commentedBy={e.commentedBy}
                        followedComment={followedComment}
                        id={e._id}
                        key={e._id}
                        updateComments={props.updateComments}
                        likes={e.likes}
                        postId={props.postId}
                    />
                }
                return (<CommentComponent
                    text={e.text}
                    date={e.dateCreated}
                    commentedBy={e.commentedBy}
                    likes={e.likes}
                    id={e._id}
                    key={e._id}
                    updateComments={props.updateComments}
                    postId={props.postId}
                />)
            })}
        </div>
    )
}

export default CommentsList