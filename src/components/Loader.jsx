const Loader = () => {
    return (
            <div className="absolute top-2/4 left-2/4" style={{transform: 'translate(-50%, -50%)'}}>
                <div className="flex items-center gap-2 text-gray-500">
                    <span className="h-24 w-24 block rounded-full border-4 border-t-orange-500 animate-spin"></span>
                </div>
            </div>
    )
}

export default Loader