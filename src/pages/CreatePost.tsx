import React, {ChangeEvent, useState} from "react";
import InputWithCaption from "../components/InputWithCaption";
import SubmitButton from "../components/SubmitButton";
import ResetButton from "../components/ResetButton";
import {posts} from "../utils/posts";
import ErrorMessage from "../components/ErrorMessage";
import {PostRes, UpdatePost} from "../types/postsTypes";

const CreatePost:React.FC = () => {
    const [postData, setPostData] = useState<UpdatePost>({
        title: "",
        fullText: "",
        description: ""
    })
    const [postImg, setPostImg] = useState<FileList | null>(null)
    const [error, setError] = useState<string | null>(null)

    function changeImgHandler(e:React.ChangeEvent<HTMLInputElement>){
        setPostImg(e.target.files)
    }

    function clearForm():void{
        window.location.href = '/'
    }

    async function sendForm(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const newPostData:PostRes = await posts.createPost(postData)
        if(newPostData.error && (typeof newPostData.data === "string")){
            setError(newPostData.data)
        }
        else {
            if (typeof newPostData.data !== "string" && '_id' in newPostData.data){
                if(postImg){
                    await posts.updateImg(newPostData.data._id, postImg)
                }
                window.location.href = '/post/' + newPostData.data._id
            }
        }
    }

    function setPostDataField(e:ChangeEvent<HTMLInputElement>, field:string | symbol){
        setPostData({
            ...postData,
            [field]:e.target.value
        })
    }

    return (
        <form onSubmit={e=>sendForm(e)}>
            <div className="bg-neutral-100 rounded-3xl mx-auto border-gray-200 border-4 p-7 my-14 lg:w-4/5 w-full space-y-8 flex flex-col">
                <div>
                    <input type="file" onChange={e=>changeImgHandler(e)} accept="image/*" />
                </div>
                <InputWithCaption
                    type="text"
                    inputValue={postData.title}
                    caption="Title"
                    changeHandler={(e: React.ChangeEvent<HTMLInputElement>)=>setPostDataField(e, 'title')}
                />
                <InputWithCaption
                    type="text"
                    inputValue={postData.fullText}
                    caption="Full text"
                    changeHandler={(e: React.ChangeEvent<HTMLInputElement>)=>setPostDataField(e, 'fullText')}
                />
                <InputWithCaption
                    type="text"
                    inputValue={postData.description}
                    caption="Description"
                    changeHandler={(e: React.ChangeEvent<HTMLInputElement>)=>setPostDataField(e, 'description')}
                />
                <div className="w-44 flex justify-between">
                    <SubmitButton />
                    <ResetButton clickHandler={clearForm}/>
                </div>
                { error && <ErrorMessage message={error} /> }
            </div>
        </form>
    )
}

export default CreatePost