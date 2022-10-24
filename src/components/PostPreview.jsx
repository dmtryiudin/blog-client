const PostPreview = () => {
    return (
        <div className="p-8 w-96 bg-neutral-100 rounded-2xl border-gray-200 border-4">
            <img
                src="http://test-blog-api.ficuslife.com/users/612e2aaac46d5405b3553d9d/a559b36fe920f331a879ee90ee3cc2a3.jpg"
                className="w-96"
            />
            <h3 className="text-3xl font-sans font-semibold mt-4">Post title</h3>
        </div>
    )
}

export default PostPreview