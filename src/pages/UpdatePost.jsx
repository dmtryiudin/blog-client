import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {posts} from "../utils/posts";
import InputWithCaption from "../components/InputWithCaption";
import SubmitButton from "../components/SubmitButton";
import ResetButton from "../components/ResetButton";
import ErrorMessage from "../components/ErrorMessage";
import NotFound from "./NotFound";
import Loader from "../components/Loader";

const UpdatePost = () => {
    const id = useParams().id
    const [currentPostData, setCurrentPostData] = useState(null)
    const [newImage, setNewImage] = useState(null)
    const [error, setError] = useState(null)
    const [loadingError, setLoadingError] = useState(false)

    useEffect(()=>{
        posts.getPostById(id)
            .then((e)=>{
                const postData = {
                    title: e.title,
                    fullText: e.fullText,
                    description: e.description
                }
                setCurrentPostData(postData)
            })
            .catch(()=>{
                setLoadingError(true)
            })
    }, [])

    function changeImgHandler(e){
        setNewImage(e.target.files)
    }

    async function sendForm(e){
        e.preventDefault()
        const response = await posts.updatePost(id, currentPostData)
        if(response.error){
            setError(response.data)
        }
        else {
            if(newImage){
                await posts.updateImg(id, newImage)
            }
            window.location = '/post/' + id
        }

    }

    function clearForm(){
        window.location = '/post/' + id
    }

    return (
        (!loadingError) ? (
            <>
                {currentPostData ?
                    <form onSubmit={e=>sendForm(e)}>
                        <div className="bg-neutral-100 rounded-3xl mx-auto border-gray-200 border-4 p-7 my-14 w-4/5 space-y-8 flex flex-col">
                            <div>
                                <input type="file" onChange={e=>changeImgHandler(e)} accept="image/*" />
                            </div>
                            <InputWithCaption
                                type="text"
                                inputValue={currentPostData.title}
                                caption="Title"
                                changeHandler={e=>setCurrentPostData({...currentPostData, title: e.target.value})}
                            />
                            <InputWithCaption
                                type="text"
                                inputValue={currentPostData.fullText}
                                caption="Full text"
                                changeHandler={e=>setCurrentPostData({...currentPostData, fullText: e.target.value})}
                            />
                            <InputWithCaption
                                type="text"
                                inputValue={currentPostData.description}
                                caption="Description"
                                changeHandler={e=>setCurrentPostData({...currentPostData, description: e.target.value})}
                            />
                            <div className="w-44 flex justify-between">
                                <SubmitButton />
                                <ResetButton clickHandler={clearForm}/>
                            </div>
                            { error && <ErrorMessage message={error} /> }
                        </div>
                    </form> : <Loader />
                }
            </>
        ) : <NotFound />
    )
}

export default UpdatePost