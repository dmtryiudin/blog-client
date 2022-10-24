const PostPreview = (props) => {
    return (
        <a href={"/post/" + props.id}>
            <div className="p-8 w-96 bg-neutral-100 rounded-2xl border-gray-200 border-4">
                <img
                    src={props.img ? ("http://test-blog-api.ficuslife.com" + props.img) : require('../img/noimage.png')}
                    className="w-96 h-56"
                />
                <h3 className="text-3xl font-sans font-semibold mt-4">{props.title.slice(0, 15)+'...'}</h3>
            </div>
        </a>
    )
}

export default PostPreview