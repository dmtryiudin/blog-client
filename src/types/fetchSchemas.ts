export interface User {
    _id: string,
    email: string,
    name: string,
    avatar:	string,
    extra_details: string,
    skills:	string,
    profession:	string,
    details: string,
    dateCreated: string,
}

export interface Post {
    _id: string,
    title: string,
    fullText: string,
    description: string,
    dateCreated: string,
    image: string,
    likes: Array<string>,
    postedBy: string
}

export interface Comment {
    _id: string,
    commentedBy: string,
    followedCommentID: string,
    postID:	string,
    text: string,
    dateCreated: string,
    likes:	Array<string>
}