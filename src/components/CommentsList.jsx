import Comment from "./Comment";

const CommentsList = (props) => {

    return (
        <div>
            {props.commentsList && props.commentsList.map(e=>{
                if(e.followedCommentID){
                    const followedComment = props.commentsList.filter(el=>el._id === e.followedCommentID)[0]
                    return <Comment
                        text={e.text}
                        date={e.dateCreated}
                        commentedBy={e.commentedBy}
                        followedComment={followedComment}
                        id={e._id}

                        updateComments={props.updateComments}
                        likes={e.likes}
                        postId={props.postId}
                    />
                }
                return <Comment
                    text={e.text}
                    date={e.dateCreated}
                    commentedBy={e.commentedBy}
                    likes={e.likes}
                    id={e._id}

                    updateComments={props.updateComments}
                    postId={props.postId}
                />
            })}
        </div>
    )
}

export default CommentsList