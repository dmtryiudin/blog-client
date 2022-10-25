const PostPreview = (props) => {
    function cutLine(str){
        return str.length > 20 ? str.slice(0, 20)+'...' : str
    }
    return (
        <a href={"/post/" + props.id}>
            <div className="p-8 w-96 bg-neutral-100 rounded-2xl border-gray-200 border-4">
                <img
                    src={props.img ? ("http://test-blog-api.ficuslife.com" + props.img) : require('../img/noimage.png')}
                    className="w-96 h-56"
                />
                <h3 title={props.title} className="text-2xl font-sans font-semibold mt-4">{cutLine(props.title)}</h3>
            </div>
        </a>
    )
}

export default PostPreview