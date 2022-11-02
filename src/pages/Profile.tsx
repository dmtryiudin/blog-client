import {useParams} from "react-router-dom";
import {getSetUser} from "../utils/getSetUser";
import React, {useEffect, useState} from "react";
import {posts} from "../utils/posts";
import PostPreview from "../components/PostPreview";
import NotFound from "./NotFound";
import Loader from "../components/Loader";
import {Post, User} from "../types/fetchSchemas";
import {convertDate} from "../utils/commonFunctions";
import LocationComponent from "../components/LocationComponent";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Profile:React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [userPosts, setUserPosts] = useState<Post[] | null>(null)
    const [errorData, setErrorData] = useState<boolean>(false)
    const authData = useTypedSelector(state=>state.auth)

    const id:string | undefined = useParams().id

    useEffect(()=>{
        if(id !== undefined){
            getSetUser.getUserById(id).then((res)=>{
                setUserData(res)
            }).catch(error=>{
                setErrorData(true)
            })

            posts.getPostsForUser(id).then((res)=>{
                setUserPosts(res.data)
            })
        }
    }, [])

    return (
        (!errorData) ? (
           <>
               {
                   userData ?
                   <div className="bg-neutral-100 rounded-3xl w-full mx-auto border-gray-200 border-4 p-7 my-14 flex flex-col space-y-3">
                       <img
                           src={userData?.avatar ? ('http://test-blog-api.ficuslife.com' + userData?.avatar) : require('../img/unknown.jpg')}
                           className="w-48 h-48"
                       />
                       {authData.fetchUserData!._id === id && <LocationComponent />}
                       {userData?.email && <span className="text-xl font-sans font-semibold">Email: {userData?.email}</span>}
                       {userData?.name && <span className="text-xl font-sans font-semibold">Name: {userData?.name}</span>}
                       {userData?.extra_details && <span className="text-xl font-sans font-semibold">Extra details: {userData?.extra_details}</span>}
                       {userData?.skills && <span className="text-xl font-sans font-semibold">Skills: {userData?.skills}</span>}
                       {userData?.profession && <span className="text-xl font-sans font-semibold">Profession: {userData?.profession}</span>}
                       {userData?.details && <span className="text-xl font-sans font-semibold">Details: {userData?.details}</span>}
                       {userData?.dateCreated && <span className="text-xl font-sans font-semibold">{convertDate(userData?.dateCreated)}</span>}
                       <div className="flex flex-wrap justify-between space-y-12">
                           <div className="hidden"/>
                           {userPosts?.map(e=>{
                               return <PostPreview title={e.title} img={e.image} id={e._id} key={e._id}/>
                           })}
                       </div>
                   </div> : <Loader />
               }
           </>
       ) : <NotFound />
    )
}

export default Profile