import React from "react";

interface PostPreviewProps {
    id:string,
    img: string,
    title:string
}

const PostPreview:React.FC<PostPreviewProps> = (props) => {
    function cutLine(str:string) : string{
        return str.length > 15 ? str.slice(0, 15)+'...' : str
    }
    return (
        <a href={"/post/" + props.id}>
            <div className="p-8 sm:w-96 w-64 bg-neutral-100 rounded-2xl border-gray-200 border-4">
                <img
                    src={props.img ? ("http://test-blog-api.ficuslife.com" + props.img) : require('../img/noimage.png')}
                    className="w-full h-56 object-cover"
                />
                <h3 title={props.title} className="text-2xl font-sans font-semibold mt-4 break-all">{cutLine(props.title)}</h3>
            </div>
        </a>
    )
}

export default PostPreview