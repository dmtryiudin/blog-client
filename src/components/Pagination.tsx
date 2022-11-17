import React from "react";

interface PaginationProps {
    setValue: (a:number)=>any,
    value:number,
    limit:number,
    itemsCount: number
}

const Pagination:React.FC<PaginationProps> = (props) => {
    function nextPage():void{
        props.setValue(props.value+props.limit)
    }

    function prevPage():void{
        props.setValue(props.value-props.limit)
    }

    return (
        <div className="flex justify-between">
            <button
                data-testid="pagination-button2"
                disabled={!props.value}
                onClick={prevPage}
                style={{background: `url(${require('../img/arrow.png')})`, backgroundSize: '100%'}}
                className="w-12 h-12 rotate-180"
            ></button>
            <span className="font-sans font-bold text-xl">
                {props.value + '-' + (props.value + props.limit)}
            </span>
            <button
                data-testid="pagination-button1"
                disabled={props.value + props.limit >= props.itemsCount}
                onClick={nextPage}
                style={{background: `url(${require('../img/arrow.png')})`, backgroundSize: '100%'}}
                className="w-12 h-12"
            ></button>
        </div>
    )
}

export default Pagination