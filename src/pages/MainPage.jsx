import PostPreview from "../components/PostPreview";
import SearchUser from "../components/SearchUser";
import Pagination from "../components/Pagination";
import {useEffect, useState} from "react";
import {posts} from "../utils/posts";
import InputWithCaption from "../components/InputWithCaption";
import Loader from "../components/Loader";

const MainPage = () => {

    const [currentPosts, setCurrentPosts] = useState(null)
    const [postFilter, setPostFilter] = useState('')
    const [paginationValue, setPaginationValue] = useState(0)
    const [paginationLimit, setPaginationLimit] = useState(0)

    useEffect(()=>{
        posts.getPostsWithPagination(paginationValue, postFilter)
            .then((e)=>{
                setCurrentPosts(e.data)
                setPaginationLimit(e.pagination.total)
            })
    }, [paginationValue, postFilter])

    function setPostFilterHandler(e){
        setPostFilter(e)
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
                                changeHandler={e=>setPostFilterHandler(e.target.value)}
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