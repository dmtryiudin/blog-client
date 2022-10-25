const Pagination = (props) => {
    function nextPage(){
        props.setValue(props.value+props.limit)
    }

    function prevPage(){
        props.setValue(props.value-props.limit)
    }

    return (
        <div className="flex justify-between">
            <button disabled={!props.value} onClick={prevPage}>{'<---Previous'}</button>
            {props.value + '-' + (props.value + props.limit)}
            <button disabled={props.value + props.limit >= props.itemsCount} onClick={nextPage}>{'Next--->'}</button>
        </div>
    )
}

export default Pagination