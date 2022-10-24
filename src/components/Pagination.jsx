import {useEffect, useState} from "react";

const Pagination = (props) => {
    const [page, setPage] = useState(0)

    useEffect(()=>{
        props.handler(page)
    }, [page])

    function nextPage(){
        setPage(page+props.limit)
    }

    function prevPage(){
        setPage(page-props.limit)
    }

    return (
        <div className="flex justify-between">
            <button disabled={!page} onClick={prevPage}>{'<---Previous'}</button>
            {page + '-' + (page + props.limit)}
            <button disabled={page + props.limit >= props.itemsCount} onClick={nextPage}>{'Next--->'}</button>
        </div>
    )
}

export default Pagination