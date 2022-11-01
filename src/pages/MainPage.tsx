import PostPreview from "../components/PostPreview";
import SearchUser from "../components/SearchUser";
import Pagination from "../components/Pagination";
import React, {ChangeEvent, useEffect, useState} from "react";
import {posts} from "../utils/posts";
import InputWithCaption from "../components/InputWithCaption";
import Loader from "../components/Loader";
import {Post} from "../types/fetchSchemas";

const MainPage:React.FC = () => {

    const [currentPosts, setCurrentPosts] = useState<Post[] | null>(null)
    const [postFilter, setPostFilter] = useState<string>('')
    const [paginationValue, setPaginationValue] = useState<number>(0)
    const [paginationLimit, setPaginationLimit] = useState<number>(0)

    useEffect(()=>{
        posts.getPostsWithPagination(paginationValue, postFilter)
            .then((e)=>{
                if ("data" in e) {
                    setCurrentPosts(e.data)
                }
                if ("pagination" in e) {
                    setPaginationLimit(+e.pagination.total)
                }
            })
    }, [paginationValue, postFilter])

    function setPostFilterHandler(e:ChangeEvent<HTMLInputElement>){
        setPostFilter(e.target.value)
        setPaginationValue(0)
    }

    return (
        <div className="space-y-10 py-8">
            {
                    currentPosts ? (
                    <>
                        <SearchUser />
                        <div className="bg-neutral-100 rounded-3xl border-gray-200 border-4 p-2">
                            <InputWithCaption
                                caption="Search post"
                                inputValue={postFilter}
                                changeHandler={(e: ChangeEvent<HTMLInputElement>)=>setPostFilterHandler(e)}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-wrap justify-between space-y-12 items-center lg:flex-row flex-col">
                            <div className="hidden"/>
                            {currentPosts.map(e=>{
                                return <PostPreview
                                    title={e.title}
                                    img={e.image}
                                    id={e._id}
                                    key={e._id}
                                />
                            })}
                        </div>
                        <Pagination limit={10} itemsCount={paginationLimit} value={paginationValue} setValue={setPaginationValue}/>
                    </>
                    ) : <Loader />
            }
        </div>
    )
}

export default MainPage